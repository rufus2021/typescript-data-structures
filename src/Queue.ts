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

  enqueue(val: number): void {
    this.pushBack(val);
  }

  dequeue(): number {
    const result = this.topFront();
    this.popFront();
    return result;
  }

  empty(): boolean {
    return this.getSize() === 0;
  }
}
