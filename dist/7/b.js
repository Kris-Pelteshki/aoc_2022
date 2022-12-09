"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
    const TOTAL_SPACE = 70000000;
    const SPACE_NEEDED_FOR_UPDATE = 30000000;
    class File {
        constructor(name, size) {
            this.name = name;
            this.size = size;
        }
    }
    class Directory {
        constructor(name, parent) {
            this.addNode = (node) => {
                this.children.push(node);
            };
            this.name = name;
            this.parent = parent;
            this.children = [];
        }
        removeNode(name) {
            if (!this.children) {
                return;
            }
            this.children = this.children.filter((x) => x.name !== name);
        }
        get files() {
            return this.children?.filter((x) => x instanceof File) || [];
        }
        get directories() {
            return (this.children?.filter((x) => x instanceof Directory) ||
                []);
        }
        get hasFiles() {
            return this.files.length > 0;
        }
        get fileCount() {
            return this.files.length;
        }
        get size() {
            return (0, utils_1.sum)(this.files.map((x) => x.size));
        }
        get totalSize() {
            return (0, utils_1.sum)([this.size, ...this.directories.map((x) => x.totalSize)]);
        }
    }
    class FileTree {
        constructor() {
            this.buildtree = (input) => {
                const lines = (0, utils_1.splitByLine)(input);
                let currentDirectory = this.root;
                for (const line of lines) {
                    if (line.startsWith("$ cd /")) {
                        currentDirectory = this.root;
                        continue;
                    }
                    if (line.startsWith("$ cd")) {
                        const path = line.replace("$ cd ", "");
                        const pathParts = path.split("/");
                        for (const pathPart of pathParts) {
                            if (pathPart === "..") {
                                currentDirectory = currentDirectory.parent;
                            }
                            else {
                                const directory = currentDirectory.children.find((x) => x.name === pathPart);
                                if (!directory) {
                                    const newDirectory = new Directory(pathPart, currentDirectory);
                                    currentDirectory.addNode(newDirectory);
                                    currentDirectory = newDirectory;
                                }
                                else {
                                    currentDirectory = directory;
                                }
                            }
                        }
                    }
                    else if (!line.startsWith("$") && !line.startsWith("dir")) {
                        const [size, name] = line.split(" ");
                        currentDirectory.addNode(new File(name, Number(size) || 0));
                    }
                }
                return this;
            };
            this.forEach = (callback) => {
                const visit = (node) => {
                    callback(node);
                    if (node instanceof Directory) {
                        node.children.forEach(visit);
                    }
                };
                visit(this.root);
            };
            this.find = (name) => {
                let result;
                this.forEach((node) => {
                    if (node.name === name) {
                        result = node;
                    }
                });
                return result;
            };
            this.filter = (predicate) => {
                const result = [];
                this.forEach((node) => {
                    if (predicate(node)) {
                        result.push(node);
                    }
                });
                return result;
            };
            this.root = new Directory("root");
        }
        get directories() {
            return this.filter((x) => x instanceof Directory);
        }
        get totalSize() {
            return this.root.totalSize;
        }
    }
    const fileTree = new FileTree();
    fileTree.buildtree(input_1.default);
    const spaceAvailable = TOTAL_SPACE - fileTree.totalSize;
    const spaceNeeded = SPACE_NEEDED_FOR_UPDATE - spaceAvailable;
    const sortedDirectoriesGreaterThanNeededSize = fileTree.directories
        .filter((x) => x.totalSize >= spaceNeeded)
        .sort((a, b) => a.totalSize - b.totalSize);
    const size = sortedDirectoriesGreaterThanNeededSize?.[0].totalSize;
    console.log(spaceAvailable);
    console.log(spaceNeeded);
    console.log(size);
})();
