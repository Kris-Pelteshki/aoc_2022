"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetNeighborsStrategy = exports.PathFinding = void 0;
const queue_1 = require("./queue");
class PathFinding {
    constructor(grid, getNeighborsStrategy) {
        this.grid = grid;
        this.getNeighbors = getNeighborsStrategy;
    }
    /**
     *
     * @param startPoint
     * @param endPoint
     * @returns {Path | undefined} Returns the path from start to end point or undefined if no path is found
     */
    findShortestPath(startPoint, endPoint) {
        const queue = new queue_1.Queue([startPoint]);
        const visited = new Set(startPoint.toString());
        const pathMap = new Map();
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
    static _getPath(pathMap, start, end) {
        const path = [end];
        let currentPoint = end;
        while (currentPoint.toString() !== start.toString()) {
            currentPoint = pathMap.get(currentPoint.toString());
            if (!currentPoint) {
                return undefined;
            }
            path.unshift(currentPoint);
        }
        return path;
    }
}
exports.PathFinding = PathFinding;
const createGetNeighborsStrategy = (neighborValidator) => {
    return (grid, [x, y]) => {
        const neighbors = [];
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
            return neighbors.filter((neighbor) => neighborValidator(grid[y][x], grid[neighbor[1]][neighbor[0]]));
        }
        return neighbors;
    };
};
exports.createGetNeighborsStrategy = createGetNeighborsStrategy;
