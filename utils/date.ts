import moment from 'moment';

/**
 * Converts an ISO 8601 string into a more readable format using Moment.js.
 * @param date - The ISO 8601 formatted date string to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: string): string => {
  return moment(date).format('LL'); // Format: Month Day Year, Time (AM/PM)
};
