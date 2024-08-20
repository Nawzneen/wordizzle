import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import "../styles/styles.css";
import Button from "../components/Button";

const placeHoldersElements = (
  remainingGuesses: number,
  numberOfLetters: number
) => {
  const placeholderCount = Math.max(0, remainingGuesses - 1);
  if (placeholderCount === 0) {
    return <View className=""></View>;
  }
  return (
    <View className="">
      {Array.from({ length: placeholderCount }).map((_, index) => (
        <View key={index} className="mt-2 grid gap-3 grid-cols-4 font-semibold">
          {Array.from({ length: numberOfLetters }).map((_, letterIndex) => (
            <View
              key={letterIndex}
              className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center"
            ></View>
          ))}
        </View>
      ))}
    </View>
  );
};

const index: React.FC = () => {
  const word = "bell";
  const finalNumberOfGuesses = 4;
  // const wordUpper = word.toUpperCase();
  // const guess = ["b", "l", "u", "n"];
  // const letters = wordUpper.split("");
  const numberOfLetters = word.length;
  const [remainingGuesses, setRemainingGuesses] =
    React.useState<number>(finalNumberOfGuesses);
  const [inputs, setInputs] = React.useState<string[]>([
    `${word[0]}`,
    "",
    "",
    "",
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState<boolean>(true);
  const [elements, setElements] = React.useState<JSX.Element[] | null>([]);
  const inputRefs = React.useRef<Array<TextInput | null>>([]);
  const [guessedLetters, setGuessedLetters] = React.useState<Array<string>>([]);
  React.useEffect(() => {
    // disable the submit button if any inputs are empty
    if (inputs.some((input) => input !== "")) {
      setIsSubmitDisabled(true);
    }
    const newElements = guessedLetters.map((letter, index) => {
      console.log("letter", letter, "index", index);
      if (letter === "") {
        return (
          <View
            key={index}
            className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center"
          >
            <TextInput
              className="w-8 h-8 rounded-md font-semibold text-center"
              editable
              maxLength={1}
              value={letter}
              onChangeText={(letter) => handleInputChange(letter, index)}
              // onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          </View>
        );
      }
      if (word.indexOf(letter.toLowerCase()) === -1) {
        // letter doesnt exist in word array
        console.log(letter, "this letter doesnt exist in the word");
        return (
          <View
            key={index}
            className="bg-red-300 w-8 h-8 rounded-md flex justify-center items-center"
          >
            {letter.toUpperCase()}
          </View>
        );
      } else if (word.indexOf(letter.toLowerCase()) !== -1) {
        if (letter.toLowerCase() === word[index]) {
          // letter exist in word array in a correct position
          console.log(letter, "is in a correct position", letter);
          return (
            <View
              key={index}
              className="bg-green-300 w-8 h-8 rounded-md flex justify-center items-center"
            >
              {letter.toUpperCase()}
            </View>
          );
        } else {
          console.log(letter, index, word[index]);
          // letter exist in word array in an incorrect position
          console.log(letter, "exist in word array in an incorrect position");
          return (
            <View
              key={index}
              className="bg-yellow-300 w-8 h-8 rounded-md flex justify-center items-center"
            >
              {letter.toUpperCase()}
            </View>
          );
        }
      }
      return null;
    });

    setElements((prev) => [...prev, newElements as JSX.Element[]]);
  }, [guessedLetters]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
    setGuessedLetters(inputs);
    // empty the inputs
    setInputs([`${word[0]}`, "", "", ""]);
    // set the submit button to disabled
    setIsSubmitDisabled(true);
    setRemainingGuesses((prev) => prev - 1);
  };
  const handleInputChange = (value: string, index: number) => {
    let newInputs = [...inputs];
    console.log("value", value);
    value = value.toUpperCase();
    newInputs[index] = value;
    setInputs(newInputs);
    console.log(inputs);
    // Move to the next input field if the current one is filled
    if (value.trim() !== "" && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Move to the previous input field if the current one is cleared
    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // check if the last input is filled
    if (index === inputs.length - 1 && value.trim() !== "") {
      setIsSubmitDisabled(false);
      // add the first letter to fornt of the array
      // const firstLetter = word.substring(0, 1);
      // const addLetterToFront = firstLetter;
      // const guessed = firstLetter + newInputs.join("");
      // setGuessedWord(guessed.toLowerCase());
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && inputs[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  return (
    <View className="flex justify-center items-center mt-16">
      <View className="bg-blue-600">
        <Text className="text-white font-bold ">Wordizzle</Text>
      </View>
      {/* Game */}
      <View className="mt-16 ">
        <View className="grid gap-3 grid-cols-4 font-semibold">
          {/* <View className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center">
            {letters[0]}
          </View> */}
          {elements}

          {inputs.map((input, index) => {
            if (input !== "") {
              return (
                <View className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center">
                  <View
                    key={index}
                    className=" w-8 h-8 rounded-md flex justify-center items-center"
                  >
                    {input.toUpperCase()}
                  </View>
                </View>
              );
            } else {
              return (
                <View className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center">
                  <TextInput
                    className="w-8 h-8 rounded-md font-semibold text-center"
                    key={index}
                    editable
                    maxLength={1}
                    value={input.toUpperCase()}
                    onChangeText={(text) => handleInputChange(text, index)}
                    // onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </View>
              );
            }
          })}
        </View>
        {placeHoldersElements(remainingGuesses, numberOfLetters)}

        <View className="mt-4 bg-gray-300 text-black">
          <button
            title="Submit"
            // onPress={onSubmit}
            // color="blue"
            disabled={isSubmitDisabled}
          ></button>
          <Button
            onPress={onSubmit}
            title="Submit"
            disabled={isSubmitDisabled}
          />
        </View>
      </View>
    </View>
  );
};

export default index;
