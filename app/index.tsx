import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import "../styles/styles.css";
import Button from "../components/Button";

// shows the remaining elements for guesses as blank divs depending on number of letters in the word and guesses
const placeHoldersElements = (
  remainingGuesses: number,
  numberOfLetters: number
) => {
  const placeholderCount = Math.max(0, remainingGuesses - 1);
  if (placeholderCount === 0) {
    return <View className=""></View>;
  }
  return (
    // renders elements based on number of letters and remaining guesses (rows and columns )
    <View className="">
      {Array.from<number>({ length: placeholderCount }).map((_, index) => (
        <View key={index} className="mt-2 grid gap-3 grid-cols-4 font-semibold">
          {Array.from<number>({ length: numberOfLetters }).map(
            (_, letterIndex) => (
              <View
                key={letterIndex}
                className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center"
              ></View>
            )
          )}
        </View>
      ))}
    </View>
  );
};

const index: React.FC = () => {
  const word = "bell";
  const finalNumberOfGuesses = 4;
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
    if (inputs.every((input) => input !== "")) {
      // enable the submit button if the inputs are filled
      setIsSubmitDisabled(false);
    } else {
      // disable the submit button if any inputs are empty
      setIsSubmitDisabled(true);
    }
  }, [inputs]);
  React.useEffect(() => {
    const newElements = guessedLetters.map((letter, index) => {
      if (word.indexOf(letter.toLowerCase()) === -1) {
        // letter doesnt exist in word array
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
          return (
            <View
              key={index}
              className="bg-green-300 w-8 h-8 rounded-md flex justify-center items-center"
            >
              {letter.toUpperCase()}
            </View>
          );
        } else {
          // letter exist in word array in an incorrect position
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
    setGuessedLetters(inputs);
    // empty the inputs
    setInputs([`${word[0]}`, "", "", ""]);
    // set the submit button to disabled
    setIsSubmitDisabled(true);
    if (remainingGuesses > 0) {
      setRemainingGuesses((prev) => prev - 1);
    }
  };
  const handleInputChange = (value: string, index: number) => {
    let newInputs = [...inputs];
    value = value.toUpperCase();
    newInputs[index] = value;
    setInputs(newInputs);
    // Move to the next input field if the current one is filled
    if (value.trim() !== "" && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (inputs[index] === "" && index > 1) {
        // Move focus to previous input, unless its the first letter
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear the Current input and keep focus
        handleInputChange("", index);
      }
    }
    // submit on Enter and focus on the next row
    if (e.nativeEvent.key === "Enter") {
      if (inputs.every((input) => input !== "")) {
        inputRefs.current[1]?.focus();
        onSubmit(e);
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
          {elements}
          {/* if remaning guesses is not zero, allow user to enter inputs  */}
          {remainingGuesses > 0 &&
            inputs.map((input, index) => {
              return (
                <View className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center">
                  <TextInput
                    className="w-8 h-8 rounded-md font-semibold text-center"
                    key={index}
                    editable
                    maxLength={1}
                    value={input.toUpperCase()}
                    onChangeText={(text) => handleInputChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </View>
              );
            })}
        </View>
        {placeHoldersElements(remainingGuesses, numberOfLetters)}
        <View className="mt-4 bg-gray-300 text-black">
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
