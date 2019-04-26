interface Node {
  value: number;
  left: Node;
  right: Node;
}

interface BinaryTreeContract {
  insert(current: Node, value: number): void;
  find(current: Node, value: number): number | boolean;
}

export default class BinaryTree implements BinaryTreeContract {
  public root: Node;

  constructor(value: number) {
    this.root = {
      left: null,
      right: null,
      value,
    };
  }

  public insert(current: Node, value: number): void {
    if (value < current.value) {
      if (current.left === null) {
        current.left = this.create(value);
      } else {
        this.insert(current.left, value);
      }
    } else if (value > current.value) {
      if (current.right === null) {
        current.right = this.create(value);
      } else {
        this.insert(current.right, value);
      }
    }
  }

  public find(current: Node, value: number): number | boolean {
    if (value === current.value) {
      return value;
    }

    if (value < current.value) {
      if (current.left === null) {
        return false;
      }
      return this.find(current.left, value);
    } else if (value > current.value) {
      if (current.right === null) {
        return false;
      }
      return this.find(current.right, value);
    }
  }

  private create(value: number): Node {
    return {
      left: null,
      right: null,
      value,
    };
  }

}
