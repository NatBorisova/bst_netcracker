
interface INode<T> {
    value: T;
    left: INode<T> | undefined;
    right: INode<T> | undefined;
}

export { INode };
