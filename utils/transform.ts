export const enumToDropdownOptions = (
  enumObj: object
): { label: string; value: string }[] => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace(/([A-Z])/g, '$1').trim(), // Format label for readability (e.g., "AdminRole" -> "Admin Role")
      value: (enumObj as any)[key].toString(), // Ensure value is always a string
    }));
};
