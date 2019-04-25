export interface Node {
  value: number
  left: Node
  right: Node
}

export interface BinaryTreeContract {
  insert(current: Node, value: number): void
  find(current: Node, value: number): number | boolean
}

export interface QueueContract {
  enqueue(val: number): void;
  dequeue(): number;
  empty(): boolean;
}
