/**
 * Adds an "s" to the word if the number is more than 1.
 * @param count - The number to check.
 * @param word - The word to pluralize.
 * @returns The word with or without "s" based on the count.
 */
export const pluralize = (count: number, word: string): string => {
  return count === 1 ? word : `${word}s`;
};
