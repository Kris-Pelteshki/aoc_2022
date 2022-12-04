export const exclude = <T>(setA: Set<T>, setB: Set<T>) => {
  const _difference = new Set<T>(setA);

  setB.forEach((item) => {
    _difference.delete(item);
  });

  return _difference;
};
