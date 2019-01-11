interface CircularQueueContract {
  enqueue(val: number): void;
  dequeue(): number;
  empty(): boolean;
  full(): boolean;
}

/**
 * A circular queue uses an array with pointers to track
 * enqueue and dequeue positions. The capacity works out to be one
 * less than the value declared to leave a buffer between the read and write index
 */
export default class CircularQueue implements CircularQueueContract {
  private capacity: number; // needed because arrays are dynamic in JavaScript
  private read: number;
  private write: number;
  private queue: number[];

  constructor(capacity = 5) {
    this.capacity = capacity;
    this.read = 0;
    this.write = 0;
    this.queue = [];
  }

  // writes to the the back of the queue ("tail" or write index)
  // O(1)
  enqueue(val: number): void {
    if (this.full()) {
      throw new Error('Queue is full');
    }

    this.queue[this.write] = val;
    this.write = (this.write + 1) % this.capacity;
  }

  // read from the the front of the queue ("head" or read index)
  // O(1)
  dequeue(): number {
    if (this.empty()) {
      throw new Error('Queue is empty');
    }

    const value = this.queue[this.read];
    this.queue[this.read] = null; // set to null to keep the correct size
    this.read = (this.read + 1) % this.capacity;
    return value;
  }

  // O(1)
  empty(): boolean {
    return this.read === this.write;
  }

  // O(1)
  full(): boolean {
    return (this.write + 1) % this.capacity === this.read
  }
}
