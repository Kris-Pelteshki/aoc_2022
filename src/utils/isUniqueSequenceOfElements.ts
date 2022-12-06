export const isUniqueSequenceOfElements = <T extends any[] | string>(
  input: T
) => {
  return new Set(input).size === input.length;
};
