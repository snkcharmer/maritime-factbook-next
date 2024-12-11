/**
 * Adds an "s" to the word if the number is more than 1.
 * @param count - The number to check.
 * @param word - The word to pluralize.
 * @returns The word with or without "s" based on the count.
 */
export const pluralize = (count: number, word: string): string => {
  return count === 1 ? word : `${word}s`;
};

/**
 * Converts a snake_case string into a more readable format by replacing underscores with spaces
 * and capitalizing the first letter of each word.
 * @param text - The string to format.
 * @returns The formatted string.
 */
export const formatText = (text: string): string => {
  if (!text) return '';

  // Replace underscores with spaces and capitalize the first letter of each word
  return text
    .split('_') // Split the text by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter
    .join(' '); // Join the words with spaces
};
