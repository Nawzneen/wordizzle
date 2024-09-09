import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
type ButtonProps = {
  onPress: (e: any) => void;
  title: string;
  disabled: boolean;
};
function Button({ onPress, title, disabled }: ButtonProps) {
  console.log("button is being rendered");
  return (
    <Pressable
      style={
        disabled
          ? [styles.disabledButton, styles.button]
          : [styles.activeButton, styles.button]
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  activeButton: {
    backgroundColor: "black",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default React.memo(Button);
