function* chunksGen<T>(arr: any[], amountPerChunk: number): Generator<T[]> {
  for (let i = 0; i < arr.length; i += amountPerChunk) {
    yield arr.slice(i, i + amountPerChunk);
  }
}

export const chunks = <T>(arr: T[], amountPerChunk: number) => {
  return [...chunksGen<T>(arr, amountPerChunk)];
};
