import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import "../styles/styles.css";
import Button from "../components/Button";
import PlaceHolderElements from "@/components/PlaceHolderElements";
import { fetchRandomWordByLength } from "@/utils/utils";
import CustomKeyboard from "@/components/CustomKeyboard";
import { Platform } from "react-native";
const index: React.FC = () => {
  const [word, setWord] = React.useState<string | null>(null);
  const finalNumberOfGuesses = 4;
  const numberOfLetters: number = word?.length ?? 0;
  const [remainingGuesses, setRemainingGuesses] =
    React.useState<number>(finalNumberOfGuesses);
  const [inputs, setInputs] = React.useState<string[]>(["", "", "", ""]);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState<boolean>(true);
  const [elements, setElements] = React.useState<JSX.Element[] | null>([]);

  const inputRefs = React.useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(0);
  const [guessedLetters, setGuessedLetters] = React.useState<Array<string>>([]);
  const getWord = async () => {
    try {
      const word = await fetchRandomWordByLength("4");
      setWord(word);
      console.log("word", word);
      setInputs([`${word[0]}`, "", "", ""]);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getWord();
  }, []);
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
    // Render the elements with the guessed letters in different colors
    const newElements = guessedLetters.map((letter, index) => {
      if (word?.indexOf(letter.toLowerCase()) === -1) {
        // letter doesnt exist in word array
        return (
          <View
            key={index}
            className="bg-red-300 w-8 h-8 rounded-md flex justify-center items-center p-0 m-0"
          >
            <Text className="font-semibold">{letter.toUpperCase()}</Text>
          </View>
        );
      } else if (word?.indexOf(letter.toLowerCase()) !== -1) {
        if (letter.toLowerCase() === word?.[index]) {
          // letter exist in word array in a correct positioe
          return (
            <View
              key={index}
              className="bg-green-300 w-8 h-8 rounded-md flex justify-center items-center p-0 m-0"
            >
              <Text className="font-semibold">{letter.toUpperCase()}</Text>
            </View>
          );
        } else {
          // letter exist in word array in an incorrect position
          return (
            <View
              key={index}
              className="bg-yellow-300 w-8 h-8 rounded-md flex justify-center items-center p-0 m-0"
            >
              <Text className="font-semibold">{letter.toUpperCase()}</Text>
            </View>
          );
        }
      }
      return null;
    });

    const wrapper = (
      <View className="flex flex-row items-center justify-center gap-x-3 ">
        {newElements}
      </View>
    );
    setElements((prev) => [...prev, wrapper as JSX.Element[]]);
    // Check if the guessedLetters are the same is the word
    if (guessedLetters.join("").toLocaleLowerCase() === word) {
      console.log("You won");
      hasWon();
    }
  }, [guessedLetters]);
  const hasWon = () => {
    console.log("You won");
    getWord();
    setRemainingGuesses(finalNumberOfGuesses);
    setElements([]);
    setGuessedLetters([]);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    setGuessedLetters(inputs);
    // set new focus to the first element
    inputRefs.current[0]?.focus();
    // empty the inputs
    setInputs([`${word?.[0]}`, "", "", ""]);
    // set the submit button to disabled
    setIsSubmitDisabled(true);
    if (remainingGuesses > 0) {
      setRemainingGuesses((prev) => prev - 1);
    }
    //  else if (remainingGuesses <= 0) {
    // }
  };
  const onRefresh = () => {
    getWord();
    setRemainingGuesses(finalNumberOfGuesses);
    setElements([]);
    setGuessedLetters([]);
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
      } else {
        console.log(index);
        inputRefs.current[index]?.focus();
      }
    }
  };
  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
  };
  const handleCustomKeyPress = (key: string): void => {
    if (key === "DEL") {
      if (focusedIndex !== null && inputs[focusedIndex] === "") {
        // Move to the previous input field if the current one is empty
        inputRefs.current[focusedIndex - 1]?.focus();
      } else if (focusedIndex !== null && inputs[focusedIndex] !== "") {
        handleInputChange("", focusedIndex);
      }
    } else {
      if (focusedIndex !== null) {
        const newInputs = [...inputs]; //copy the inputs
        newInputs[focusedIndex] = key; //store the key in the focused input
        setInputs(newInputs);
        inputRefs.current[focusedIndex + 1]?.focus(); //focus on the next input
        console.log("update input", focusedIndex, "with key", key);
      } else {
        // console.log("no input is currently focused");
      }
    }
  };
  return (
    <View className="flex justify-center items-center bg-gray-500 h-screen">
      <View className="">
        <Text className="text-white font-bold ">Wordizzle</Text>
      </View>

      <View className="mt-16 ">
        <View className=" ">
          <View className="flex flex-col gap-y-3 p-0 m-0">{elements}</View>
          <View className="flex flex-row gap-x-3 mt-2 p-0">
            {remainingGuesses > 0 && word !== ""
              ? inputs.map((input, index) => {
                  return (
                    <View
                      key={index}
                      className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center "
                    >
                      {Platform.OS === "web" ? (
                        <TextInput
                          className="w-8 h-8 rounded-md font-semibold text-center"
                          editable
                          maxLength={1}
                          value={input.toUpperCase()}
                          onChangeText={(text) =>
                            handleInputChange(text, index)
                          }
                          onKeyPress={(e) => handleKeyPress(index, e)}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      ) : (
                        <TextInput
                          className="w-8 h-8 rounded-md font-semibold text-center"
                          maxLength={1}
                          value={inputs[index].toUpperCase()}
                          showSoftInputOnFocus={false}
                          // onChangeText={(text) => handleInputChange(text, index)}
                          // onKeyPress={(e) => handleKeyPress(index, e)}
                          onFocus={() => handleInputFocus(index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                          // placeholder={` ${index + 1}`}
                        />
                      )}
                    </View>
                  );
                })
              : null}
          </View>
        </View>
        <PlaceHolderElements
          remainingGuesses={remainingGuesses}
          numberOfLetters={numberOfLetters}
        />
        <View className="mt-4 text-black">
          <Button
            onPress={onSubmit}
            title="Submit"
            disabled={isSubmitDisabled}
          />
          {remainingGuesses <= 0 && (
            <Button onPress={onRefresh} title="Refresh" />
          )}
        </View>
      </View>
      {Platform.OS === "web" ? null : (
        <CustomKeyboard handleCustomKeyPress={handleCustomKeyPress} />
      )}
    </View>
  );
};

export default index;
