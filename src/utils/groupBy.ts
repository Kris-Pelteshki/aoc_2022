type KeyIdentifierFunction<T> = (elem: T) => any;

type KeyReturnType<T, TKey> = TKey extends KeyIdentifierFunction<T>
  ? ReturnType<TKey>
  : TKey extends keyof T
  ? T[TKey]
  : never;

export const groupBy = <T, TKey extends keyof T | KeyIdentifierFunction<T>>(
  iterable: T[],
  keyIdentifier: TKey
) => {
  const map = new Map<KeyReturnType<T, TKey>, T[]>();

  for (let i = 0; i < iterable.length; i++) {
    const elem = iterable[i];
    const key =
      typeof keyIdentifier === "function"
        ? keyIdentifier(elem)
        : elem[keyIdentifier as keyof T];

    const collection = map.get(key);
    if (!collection) {
      map.set(key, [elem]);
    } else {
      collection.push(elem);
    }
  }

  return map;
};
