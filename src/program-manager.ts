import { BinarySearchTree } from "./binary-search-tree";
import { drawTree } from "./d3-tree";

const ADDED_VALUE = <HTMLInputElement>document.getElementById("addedValue");
const DELETED_VALUE = <HTMLInputElement>document.getElementById("deletedValue");
const FINDED_VALUE = <HTMLInputElement>document.getElementById("findedValue");
const TRAVERSED_VALUE = <HTMLInputElement>document.getElementById("traversedValue");

const BST = new BinarySearchTree();

class ProgramManager {

    public init(): void {

        let valueType = "number";

        document.getElementById("add")?.addEventListener("click", () => {

            try {
                this.validateInput(valueType, ADDED_VALUE.value);

                if (valueType === "number") {
                    BST.add(Number(ADDED_VALUE.value));
                } else {
                    BST.add(ADDED_VALUE.value);
                }

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
                this.validateInput(valueType, DELETED_VALUE.value);

                if (valueType === "number") {
                    BST.delete(Number(DELETED_VALUE.value));
                } else {
                    BST.delete(DELETED_VALUE.value);
                }

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
                this.validateInput(valueType, FINDED_VALUE.value);

                if (valueType === "number") {
                    BST.find(Number(FINDED_VALUE.value));
                } else {
                    BST.find(FINDED_VALUE.value);
                }

                const treeData = BST.getTreeForDrawing();
                if (valueType === "number") {
                    drawTree(treeData, Number(FINDED_VALUE.value));
                } else {
                    drawTree(treeData, FINDED_VALUE.value);
                }
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

            valueType = (<HTMLInputElement>e.target).value;
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

    private validateInput(valueType: string, value: string): void {

        if (value === "") {
            throw new Error("Value is empty");
        }

        if (valueType === "number") {
            if (!Number(value) && Number(value) !== 0) {
                throw new Error("Input value is not a number");
            }
        }
    }

}

export { ProgramManager };
