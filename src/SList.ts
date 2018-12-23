type nodeValue = number | string;

interface Node {
  data: nodeValue;
  next: Node;
}

interface SListIface {
  pushFront(value: nodeValue): void;
  topFront(): nodeValue | void;
  popFront(): number | void;
  pushBack(value: nodeValue): void;
  topBack(): nodeValue | void;
  popBack(): void;
  findAt(idx: number): nodeValue | void;
  erase(idx: number): void;
  empty(): boolean;
  getSize(): number;
  addAfter(key: number, value: nodeValue): void;
  addBefore(key: number, value: nodeValue): void;
}

/**
 * TypeScript implementation of a singley linked list
 * with a tail reference
 */
export default class SList implements SListIface {
  private head: Node;
  private tail: Node;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  private createNode(value: nodeValue): Node {
    return {
      data: value,
      next: null
    }
  }

  private downSize(): void {
    this.size--;
  }

  private upSize(): void {
    this.size++;
  }

  // add to front
  // O(1) constant time
  pushFront(value: nodeValue): void {
    const node: Node = this.createNode(value);
    node.next = this.head;
    this.head = node;

    // if tail is null, we had a list of zero items
    // now we have a list of one, so head and tail are set to node
    if (this.tail === null) {
      this.tail = node;
    }

    this.upSize();
  }

  // return front item
  // O(1)
  topFront(): nodeValue | void {
    if (this.head === null) {
      throw new Error('Empty list');
    }

    return this.head.data;
  }

  // remove front item
  // O(1)
  popFront(): number | void {
    if (this.head === null) {
      throw new Error('Empty list');
    }

    this.head = this.head.next;

    // if head is null, we had one node, now we have zero
    // so tail should also be set to null
    if (this.head === null) {
      this.tail = null;
    }

    this.downSize();
  }

  // add to end
  // O(n) | O(1) with a tail reference
  pushBack(value: nodeValue): void {
    const node: Node = this.createNode(value);

    // if tail is null we have an empty list
    if (this.tail === null) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.upSize();
  }

  // return last item
  // O(n) | O(1) with a tail reference
  topBack(): nodeValue | void {
    if (this.head === null) {
      throw new Error('Empty list');
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }

    return node.data;
  }

  // remove last item
  // O(n)
  popBack(): void {
    if (this.head === null) {
      throw new Error('Empty list');
    }

    // we have a list of 1
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      let node = this.head;
      while (node.next.next !== null) {
        node = node.next;
      }

      // node now points to the next to last item
      // setting node.next to null orphans our last node for garbage collection
      // then we update the tail to point to the node before the old tail
      node.next = null;
      this.tail = node;
    }

    this.downSize();
  }

  // find a node by its index in the list
  // O(n)
  findAt(idx: number): nodeValue | void {
    if (this.head === null) {
      throw new Error('Empty list');
    }

    if (idx >= this.size) {
      throw new Error('Out of range');
    }

    let node = this.head;
    while (idx > 0) {
      node = node.next;
      idx--;
    }
    return node.data;
  }

  // delete a node at a given index
  // O(n)
  erase(idx: number): void {
    if (this.head === null) {
      throw new Error('Empty list');
    }

    if (idx >= this.size) {
      throw new Error('Out of range');
    }

    let node = this.head;

    // we only have one node
    // delete and remove head & tail reference
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else if (idx === 0) {
      this.head = node.next;
    } else {
      let index = 1;
      while (index !== idx && node.next !== null) {
        node = node.next;
        index++;
      }

      const temp = node.next.next;
      node.next.next = null;
      node.next = temp;
      if (temp === null) {
        this.tail = node;
      }
    }

    this.downSize();
  }

  // add a node after the node with the value of key
  // O(n)
  addAfter(key: nodeValue, value: nodeValue): void {
    const newNode: Node = this.createNode(value);

    let node = this.head;
    if (node === null) {
      throw new Error('Empty list');
    }

    while (node !== null && node.data !== key) {
      node = node.next;
    }

    if (node === null) {
      throw new Error('Value to insert after not found');
    }

    newNode.next = node.next;
    node.next = newNode;

    if (this.tail === node) {
      this.tail = newNode;
    }

    this.upSize();
  }

  // add a node before the node with the value of key
  // O(n)
  addBefore(key: nodeValue, value: nodeValue):void {
    const newNode: Node = this.createNode(value);

    let node = this.head;
    if (node === null) {
      throw new Error('Empty list');
    }

    while (node.data !== key && node.next !== null && node.next.data !== key) {
      node = node.next;
    }

    if (node.data !== key || node === null) {
      throw new Error('Value to insert before not found');
    }

    // inserting at position 1
    // points the new node to head
    // and sets itself to the head
    if (node === this.head) {
      newNode.next = node;
      this.head = newNode;
    } else {
      newNode.next = node.next;
      node.next = newNode;
    }

    this.size++;
  }

  // check if the list is empty
  // O(1)
  empty(): boolean {
    return this.head === null;
  }

  getSize(): number {
    return this.size;
  }

  print(): void {
    if (this.head === null) {
      return;
    }

    let node = this.head;
    while(node !== null) {
      console.log(`data is ${node.data}`);
      node = node.next;
    }
  }
}
