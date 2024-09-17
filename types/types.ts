export interface CustomKeyboardProps {
  handleCustomKeyPress: (key: string) => void;
}
export interface ButtonProps {
  onPress: (e: any) => void;
  title: string;
  disabled?: boolean;
}
export interface PlaceHoldersElementsProps {
  remainingGuesses: number;
  numberOfLetters: number;
}
