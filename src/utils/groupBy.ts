type KeyType = string | number | boolean | Date;

export const groupBy = <T>(
  iterable: Iterable<T>,
  keyFn: (elem: T) => KeyType
) => {
  const map = new Map<KeyType, T[]>();

  for (const elem of iterable) {
    const key = keyFn(elem);

    const collection = map.get(key);
    if (!collection) {
      map.set(key, [elem]);
    } else {
      collection.push(elem);
    }
  }

  return map;
};
