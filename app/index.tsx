import { View, Text, TextInput } from "react-native";
import React from "react";
import "../styles/styles.css";

const index: React.FC = () => {
  const word = "bell";
  const wordUpper = word.toUpperCase();
  const letters = wordUpper.split("");
  const [inputs, setInputs] = React.useState<string[]>(["", "", ""]);
  const [guessedWord, setGuessedWord] = React.useState<string>("");
  const inputRefs = React.useRef<Array<TextInput | null>>([]);
  React.useEffect(() => {
    console.log(guessedWord);
    if (guessedWord.toLowerCase() === word.toLowerCase()) {
      alert("You have guessed the word correctly");
    }
  }, [guessedWord]);

  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    console.log("valu", value);
    value = value.toUpperCase();
    newInputs[index] = value;
    setInputs(newInputs);
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
      // add the first letter to the guess word
      const firstLetter = word.substring(0, 1);
      const guessed = firstLetter + newInputs.join("");
      setGuessedWord(guessed.toLowerCase());
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
          <View className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center">
            {letters[0]}
          </View>
          {inputs.map((input, index) => (
            <View className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center">
              <TextInput
                className="w-8 h-8 rounded-md font-semibold text-center"
                key={index}
                editable
                maxLength={1}
                value={input}
                onChangeText={(text) => handleInputChange(text, index)}
                // onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default index;
