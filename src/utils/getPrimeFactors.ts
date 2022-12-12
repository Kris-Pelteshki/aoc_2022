export const getPrimeFactors = (num: number): Set<number> => {
  const factors = new Set<number>();
  let currentNum = num;
  let divisor = 2;

  while (currentNum >= 2) {
    if (currentNum % divisor === 0) {
      factors.add(divisor);
      currentNum = currentNum / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
};
