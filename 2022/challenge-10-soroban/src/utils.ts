export const replaceAt = function (
  input: string,
  index: number,
  replacement: string
) {
  return (
    input.substring(0, index) +
    replacement +
    input.substring(index + replacement.length)
  );
};
