export const product = (arr: Iterable<number>) => {
  let result = 1;
  for (const num of arr) {
    result *= num;
  }
  return result;
};
