import { INode } from "./inode";
import { ITree } from "./itree";

class BinarySearchTree<T> implements ITree<T> {

    private _root: INode<T> | undefined;

    private createNewNode(value: T): INode<T> {
        return {
            value,
            left: undefined,
            right: undefined
        };
    }

    public clear(): void {
        this._root = undefined;
    }

    public add(value: T): void {

        if (!this._root) {
            this._root = this.createNewNode(value);
        } else {

            let currentNode: INode<T> | undefined = this._root;

            while (currentNode) {
                if (currentNode.value > value) {
                    if (!currentNode.left) {
                        currentNode.left = this.createNewNode(value);
                        return;
                    }
                    currentNode = currentNode.left;
                } else {
                    if (!currentNode.right) {
                        currentNode.right = this.createNewNode(value);
                        return;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }

    public find(value: T): INode<T> | undefined {

        let currentNode: INode<T> | undefined = this._root;

        while (currentNode) {
            if (value === currentNode.value) {
                return currentNode;
            }
            currentNode = (value > currentNode.value) ? currentNode.right : currentNode.left;
        }

        return undefined;
    }

    public delete(value: T): void {
        this.deleteRecursively(this._root, value);
    }

    private deleteRecursively(node: INode<T> | undefined, value: T): INode<T> | undefined {

        if (!node) {
            return undefined;
        }

        if (node.value === value) {
            if (node === this._root) {
                this._root = this.deleteNode(node);
            } else {
                node = this.deleteNode(node);
            }
        } else if (value < node.value) {
            node.left = this.deleteRecursively(node.left, value);
        } else {
            node.right = this.deleteRecursively(node.right, value);
        }

        return node;
    }

    private deleteNode(node: INode<T> | undefined): INode<T> | undefined {

        if (!node || !node.left && !node.right) {

            return undefined;

        }
        if (node.left && node.right) {

            let childNode: INode<T> = node.right;
            while (childNode.left) {
                childNode = childNode.left;
            }

            node = this.deleteRecursively(node, childNode.value);
            if (node) {
                node.value = childNode.value;
            }

            return node;

        }
        if (node.left) {

            return node.left;

        }
        if (node.right) {

            return node.right;

        }
    }

    private preorderTraversal(node: INode<T> | undefined, valuesArray: Array<T>): void {

        if (!node) {
            return;
        }

        valuesArray.push(node.value);

        this.preorderTraversal(node.left, valuesArray);
        this.preorderTraversal(node.right, valuesArray);

    }


    public traverse(): Array<T> {

        const values = new Array;

        this.preorderTraversal(this._root, values);

        return values;

    }

    private treeTraversalForDrawing(node: INode<T> | undefined, children: Array<object>): void {

        if (!node) {
            return;
        }

        let nodeData;
        nodeData = { value: node.value, children: [] };

        children.push(nodeData);

        this.treeTraversalForDrawing(node.left, nodeData.children);
        this.treeTraversalForDrawing(node.right, nodeData.children);
    }

    public getTreeForDrawing(): object {

        const tree = { value: this._root?.value, children: [] };

        this.treeTraversalForDrawing(this._root?.left, tree.children);
        this.treeTraversalForDrawing(this._root?.right, tree.children);

        return tree;

    }

}

export { BinarySearchTree };
