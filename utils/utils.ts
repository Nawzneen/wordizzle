// import wordsList from "@/assets/data/top_10k_filtered_words_between_3_9_dropped_2_columns.json";
const wordsList = require("../assets/data/top_10k_filtered_words_between_3_9_dropped_2_columns.json");

export async function fetchRandomWordByLength(length: string, attempts = 0) {
  console.log("fetchRandomWord");
  if (attempts > 100) {
    // Limit the number of attempts to prevent infinite recursion
    console.log("Too many attempts, stopping recursion.");
    return null;
  }
  const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  if (randomWord.word_length === length) {
    // word is found
    return randomWord.word;
  } else {
    // Word not found
    return fetchRandomWordByLength(length, attempts + 1);
  }
}
