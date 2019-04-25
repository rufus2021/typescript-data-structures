export interface Node {
  value: number
  left: Node
  right: Node
}

export interface BinaryTreeIface {
  insert(current: Node, value: number): void
  find(current: Node, value: number): number | boolean
}
