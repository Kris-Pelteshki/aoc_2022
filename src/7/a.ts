import { flow, splitByLine, sum } from "../utils";
import input from "./input";

(function () {
  class File {
    name: string;
    size: number;

    constructor(name: string, size: number) {
      this.name = name;
      this.size = size;
    }
  }

  class Directory {
    name: string;
    parent?: Directory;
    children: (Directory | File)[];

    constructor(name: string, parent?: Directory) {
      this.name = name;
      this.parent = parent;
      this.children = [];
    }

    addNode = (node: Directory | File) => {
      this.children.push(node);
    };

    removeNode(name: string) {
      if (!this.children) {
        return;
      }

      this.children = this.children.filter((x) => x.name !== name);
    }

    get files(): File[] {
      return (this.children?.filter((x) => x instanceof File) as File[]) || [];
    }

    get directories(): Directory[] {
      return (
        (this.children?.filter((x) => x instanceof Directory) as Directory[]) ||
        []
      );
    }

    get hasFiles() {
      return this.files.length > 0;
    }

    get fileCount() {
      return this.files.length;
    }

    get size() {
      return sum(this.files.map((x) => x.size));
    }

    get totalSize(): number {
      return sum([this.size, ...this.directories.map((x) => x.totalSize)]);
    }
  }

  class FileTree {
    root: Directory;

    constructor() {
      this.root = new Directory("root");
    }

    buildtree = (input: string) => {
      const lines = splitByLine(input);

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
              currentDirectory = currentDirectory.parent as Directory;
            } else {
              const directory = currentDirectory.children.find(
                (x) => x.name === pathPart
              ) as Directory;

              if (!directory) {
                const newDirectory = new Directory(pathPart, currentDirectory);
                currentDirectory.addNode(newDirectory);
                currentDirectory = newDirectory;
              } else {
                currentDirectory = directory;
              }
            }
          }
        } else if (!line.startsWith("$") && !line.startsWith("dir")) {
          const [size, name] = line.split(" ");
          currentDirectory.addNode(new File(name, Number(size) || 0));
        }
      }

      return this;
    };

    forEach = (callback: (node: Directory | File) => void) => {
      const visit = (node: Directory | File) => {
        callback(node);

        if (node instanceof Directory) {
          node.children.forEach(visit);
        }
      };

      visit(this.root);
    };

    find = (name: string) => {
      let result: Directory | File | undefined;

      this.forEach((node) => {
        if (node.name === name) {
          result = node;
        }
      });

      return result;
    };

    filter = (predicate: (node: Directory | File) => boolean) => {
      const result: (Directory | File)[] = [];

      this.forEach((node) => {
        if (predicate(node)) {
          result.push(node);
        }
      });

      return result;
    };

    get directories() {
      return this.filter((x) => x instanceof Directory) as Directory[];
    }
  }

  const fileTree = new FileTree();
  const result = flow(input).pipe(fileTree.buildtree);

  const size = sum(
    result.directories
      .filter((x) => x.totalSize <= 100_000)
      .map((x) => x.totalSize)
  );

  console.log(size);
})();
