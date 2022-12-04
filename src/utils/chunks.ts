export const chunks = <T>(arr: T[], amountPerChunk: number) => {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += amountPerChunk) {
    result.push(arr.slice(i, i + amountPerChunk));
  }

  return result;
};
