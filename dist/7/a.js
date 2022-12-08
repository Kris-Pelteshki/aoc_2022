"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const input_1 = __importDefault(require("./input"));
(function () {
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
            var _a;
            return ((_a = this.children) === null || _a === void 0 ? void 0 : _a.filter((x) => x instanceof File)) || [];
        }
        get directories() {
            var _a;
            return (((_a = this.children) === null || _a === void 0 ? void 0 : _a.filter((x) => x instanceof Directory)) ||
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
    }
    const fileTree = new FileTree();
    const result = (0, utils_1.flow)(input_1.default).pipe(fileTree.buildtree);
    const size = (0, utils_1.sum)(result.directories
        .filter((x) => x.totalSize <= 100000)
        .map((x) => x.totalSize));
    console.log(size);
})();
