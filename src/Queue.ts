import SList from './SList';

interface QueueContract {
  enqueue(val: number): void;
  dequeue(): number;
  empty(): boolean;
}


/**
 * A Queue implementation using a linked list
 * All operations are constant time since the
 * linked list tracks the tail so no traversing
 * is needed to reach the last item (which is the first added)
 */
export default class Queue extends SList implements QueueContract {
  constructor() {
    super();
  }

  // O(1)
  enqueue(val: number): void {
    this.pushBack(val);
  }

  // O(1)
  dequeue(): number {
    const result = this.topFront();
    this.popFront();
    return result as number;
  }

  // O(1)
  empty(): boolean {
    return this.getSize() === 0;
  }
}
