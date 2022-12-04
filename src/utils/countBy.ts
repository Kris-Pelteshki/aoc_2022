export const countBy = <T, MapKey>(
  iterable: Iterable<T>,
  fn: (elem: T) => MapKey
): Map<MapKey, number> => {
  const aggregate = new Map<MapKey, number>();

  for (const elem of iterable) {
    const mapKey = fn(elem);
    const count = aggregate.get(mapKey) || 0;

    aggregate.set(mapKey, count + 1);
  }

  return aggregate;
};
