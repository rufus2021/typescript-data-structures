const { default: SList } = require('./SList');

interface QueueContract {
  enqueue(val: number): void;
  dequeue(): number;
  empty(): boolean;
}

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
    return result;
  }

  // O(1)
  empty(): boolean {
    return this.getSize() === 0;
  }
}
