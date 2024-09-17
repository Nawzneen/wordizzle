import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomKeyboardProps } from "@/types/types";
const CustomKeyboard: React.FC<CustomKeyboardProps> = ({
  handleCustomKeyPress,
}) => {
  const letterRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  return (
    <View style={styles.keyboard}>
      {letterRows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={styles.button}
              onPress={() => handleCustomKeyPress(letter)}
            >
              <Text style={styles.letter}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
// Styles for the keyboard

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#f2f2f2",
    width: 35,
    height: 45,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 10,
  },
  letter: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default CustomKeyboard;
