import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
type PlaceHoldersElementsProps = {
  remainingGuesses: number;
  numberOfLetters: number;
};

// shows the remaining elements for guesses as blank divs depending on number of letters in the word and guesses
const PlaceHoldersElements = ({
  remainingGuesses,
  numberOfLetters,
}: PlaceHoldersElementsProps) => {
  const placeholderCount = Math.max(0, remainingGuesses - 1);
  if (placeholderCount === 0) {
    return null;
  }
  console.log("placeholder is being rendered");
  // renders elements based on number of letters and remaining guesses (rows and columns )
  return (
    <View className="mt-1 ">
      {Array.from<number>({ length: placeholderCount }).map((_, index) => (
        <View
          key={index}
          className="pt-2 flex flex-row flex-wrap justify-center items-center gap-3 "
        >
          {Array.from<number>({ length: numberOfLetters }).map(
            (_, letterIndex) => (
              <View
                key={letterIndex}
                className="bg-gray-300 w-8 h-8 rounded-md flex justify-center items-center gap-3"
              ></View>
            )
          )}
        </View>
      ))}
    </View>
  );
};
export default React.memo(PlaceHoldersElements);
