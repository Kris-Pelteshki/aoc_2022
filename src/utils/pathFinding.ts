import { Queue } from "./queue";

export type Point = [number, number];
export type Path = Point[];
export type Grid<T> = T[][];
export type GetNeighborsStrategy<ItemType> = (
  grid: Grid<ItemType>,
  point: Point,
  neighborValidator?: (item: ItemType) => boolean
) => Point[];

export class PathFinding<ItemType = number> {
  grid: Grid<ItemType>;
  getNeighbors: GetNeighborsStrategy<ItemType>;

  constructor(
    grid: Grid<ItemType>,
    getNeighborsStrategy: GetNeighborsStrategy<ItemType>
  ) {
    this.grid = grid;
    this.getNeighbors = getNeighborsStrategy;
  }

  /**
   *
   * @param startPoint
   * @param endPoint
   * @returns {Path | undefined} Returns the path from start to end point or undefined if no path is found
   */
  public findPath(
    startPoint: Point,
    endPoint: Point
  ): Path | undefined {
    const queue = new Queue([startPoint]);
    const visited = new Set<string>(startPoint.toString());
    const pathMap = new Map<string, Point>();

    while (queue.size) {
      const currentPoint = queue.dequeue();
      const neighbors = this.getNeighbors(this.grid, currentPoint);

      neighbors.forEach((neighbor) => {
        const neighborKey = neighbor.toString();

        if (!visited.has(neighborKey)) {
          visited.add(neighborKey);
          pathMap.set(neighborKey, currentPoint);
          queue.enqueue(neighbor);
        }
      });
    }

    const path = PathFinding._getPath(pathMap, startPoint, endPoint);

    return path;
  }

  private static _getPath(
    pathMap: Map<string, Point>,
    start: Point,
    end: Point
  ) {
    const path: Path = [end];
    let currentPoint = end;

    while (currentPoint.toString() !== start.toString()) {
      currentPoint = pathMap.get(currentPoint.toString()) as Point;

      if (!currentPoint) {
        return undefined;
      }

      path.push(currentPoint);
    }

    return path.reverse();
  }
}

export const createGetNeighborsStrategy = <ItemType = unknown>(
  neighborValidator?: (current: ItemType, neightbor: ItemType) => boolean
) => {
  return (grid: Grid<ItemType>, [x, y]: Point): Point[] => {
    const neighbors: Point[] = [];

    if (grid[y - 1]?.[x]) {
      neighbors.push([x, y - 1]);
    }

    if (grid[y + 1]?.[x]) {
      neighbors.push([x, y + 1]);
    }

    if (grid[y][x - 1]) {
      neighbors.push([x - 1, y]);
    }

    if (grid[y][x + 1]) {
      neighbors.push([x + 1, y]);
    }

    if (neighborValidator) {
      return neighbors.filter((neighbor) =>
        neighborValidator(grid[y][x], grid[neighbor[1]][neighbor[0]])
      );
    }

    return neighbors;
  };
};
