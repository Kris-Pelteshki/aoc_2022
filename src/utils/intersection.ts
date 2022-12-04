export const intersection = <T>(setA: Set<T>, setB: Set<T>) => {
  const _intersection = new Set<T>();

  setB.forEach((item) => {
    if (setA.has(item)) {
      _intersection.add(item);
    }
  });

  return _intersection;
};
