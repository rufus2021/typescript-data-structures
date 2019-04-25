import { Node, BinaryTreeIface } from '../types';

export default class BinaryTree implements BinaryTreeIface {
  root: Node;

  constructor(value: number) {
    this.root = {
      value: value,
      left: null,
      right: null
    }
  }

  private create(value: number): Node {
    return {
      value: value,
      left: null,
      right: null
    };
  }

  insert(current: Node, value: number): void {
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

  find(current: Node, value: number): number | boolean {
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

}
