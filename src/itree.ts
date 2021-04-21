import { INode } from "./inode";

interface ITree<T> {
    add(value: T): void;
    find(value: T): INode<T> | undefined;
    delete(value: T): void;
    traverse(): Array<T>;
    getTreeForDrawing(): object;
}

export { ITree };
