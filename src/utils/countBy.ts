export const countBy = <T, MapKey>(
  iterable: Iterable<T>,
  fn: (elem: T) => MapKey
): Map<MapKey, number> => {
  const map = new Map<MapKey, number>();

  for (const elem of iterable) {
    const mapKey = fn(elem);
    const count = map.get(mapKey) || 0;

    map.set(mapKey, count + 1);
  }

  return map;
};
