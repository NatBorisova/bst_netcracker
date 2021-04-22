import { BinarySearchTree } from "./binary-search-tree";
import { drawTree } from "./d3-tree";

const ADDED_VALUE = <HTMLInputElement>document.getElementById("addedValue");
const DELETED_VALUE = <HTMLInputElement>document.getElementById("deletedValue");
const FINDED_VALUE = <HTMLInputElement>document.getElementById("findedValue");
const TRAVERSED_VALUE = <HTMLInputElement>document.getElementById("traversedValue");

const BST = new BinarySearchTree();

class ProgramManager {

    valueType: string;

    constructor() {
        this.valueType = "number";
    }

    public init(): void {

        document.getElementById("add")?.addEventListener("click", () => {

            try {
                let value = this.getValue(ADDED_VALUE.value);
                this.validateInput(ADDED_VALUE.value, Boolean(BST.find(value)), true);

                BST.add(value);

                this.clearInputs();
                this.updateTreeTraverse();

                const treeData = BST.getTreeForDrawing();
                drawTree(treeData);
            } catch (error) {
                console.error(`Failed to add value. ${error.message}.`);
            }
        });

        document.getElementById("delete")?.addEventListener("click", () => {

            try {
                let value = this.getValue(DELETED_VALUE.value);
                this.validateInput(DELETED_VALUE.value, Boolean(BST.find(value)));

                BST.delete(value);

                this.clearInputs();
                this.updateTreeTraverse();

                const treeData = BST.getTreeForDrawing();
                drawTree(treeData);
            } catch (error) {
                console.error(`Failed to delete value. ${error.message}.`);
            }

        });

        document.getElementById("find")?.addEventListener("click", () => {

            try {
                let value = this.getValue(FINDED_VALUE.value);
                this.validateInput(FINDED_VALUE.value, Boolean(BST.find(value)));

                BST.find(value);

                const treeData = BST.getTreeForDrawing();
                drawTree(treeData, value);

            } catch (error) {
                console.error(`Failed to find value. ${error.message}.`);
            }

        });

        document.getElementsByName("valueType").forEach(radioBtn => radioBtn.addEventListener("click", (e) => {
            const tree = document.getElementById("tree");
            if (tree) {
                tree.innerHTML = "";
            }
            BST.clear();

            this.valueType = (<HTMLInputElement>e.target).value;
        }));
    }

    private clearInputs(): void {
        ADDED_VALUE.value = "";
        DELETED_VALUE.value = "";
        FINDED_VALUE.value = "";
        TRAVERSED_VALUE.innerHTML = "";
    }

    private updateTreeTraverse(): void {
        TRAVERSED_VALUE.innerHTML = `Preorder traversal: ${BST.traverse().join(",")}`;
    }

    private validateInput(value: string, isValueFound: boolean, isAdding: boolean = false): void {

        if (value === "") {
            throw new Error("Value is empty");
        }

        if (isAdding && isValueFound) {
            throw new Error("Value is already presented");
        } else if (!isAdding && !isValueFound) {
            throw new Error("Value is not found");
        }

        if (this.valueType === "number") {
            if (!Number(value) && Number(value) !== 0) {
                throw new Error("Input value is not a number");
            }
        }
    }

    private getValue(value: string): string | number {
        if (this.valueType === "number") {
            return Number(value);
        } else {
            return value;
        }
    }

}

export { ProgramManager };
