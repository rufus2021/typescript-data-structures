interface DynamicArrayIface {
  getCapacity(): number;
  getSize(): number;
  isEmpty(): boolean;
  append(val: number): void;
  prepend(val: number): void;
  set(i: number, val: number): void;
  getAt(i: number): number;
  deleteAt(i: number): void;
  insertAt(i: number, val: number): void;
  find(val: number): number;
  pop(): number;
  remove(val: number): void;
}

export default class DynamicArray implements DynamicArrayIface {
  private dynamicArray: number[];
  private capacity: number;

  constructor() {
    this.dynamicArray = [];
    this.capacity = 4;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getSize(): number {
    return this.dynamicArray.length;
  }

  isEmpty(): boolean {
    return this.dynamicArray.length === 0;
  }

  // O(1) if not at capacity
  // O(n) if at capacity
  append(val: number): void {
    const size = this.getSize();
    if (size === this.capacity) {
      // for learning purposes since arrays are dynamic in JavaScript
      // 1. create a new array
      // 2. copy contents to new array
      // 3. add new value to the end
      // 4. replace dynamicArray with replacement
      // 5. update capacity
      const replacement = [];
      for (let i = 0; i < size; i++) {
        replacement[i] = this.dynamicArray[i];
      }
      replacement[size] = val;
      this.dynamicArray = replacement;
      this.capacity *= 2;
    }

    this.dynamicArray[size] = val;
  }

  // O(n)
  prepend(val: number): void {
    let size = this.getSize();
    if (size === this.capacity) {
      // for learning purposes since arrays are dynamic in JavaScript
      // 1. create a new array
      // 2. copy contents to new array (moving each item forward 1 place)
      // 3. add new value to the beginning
      // 4. replace dynamicArray with replacement
      // 5. update capacity
      const replacement = [];
      for (let i = 0; i < size; i++) {
        replacement[i + 1] = this.dynamicArray[i];
      }
      replacement[0] = val;
      this.dynamicArray = replacement;
      this.capacity *= 2;
    } else {
      while (size > 0) {
        // 1. start at the end, moving each i - 1 forward 1 place
        // 2. add to the beginning
        this.dynamicArray[size] = this.dynamicArray[size - 1];
        size--;
      }
      this.dynamicArray[0] = val;
    }
  }

  // O(1)
  set(i: number, val: number): void {
    if (i >= this.capacity) {
      throw new Error('Out of range');
    }

    this.dynamicArray[i] = val;
  }

  // return value at index
  // O(1)
  getAt(i: number) {
    const size = this.getSize();
    if (0 === size) {
      throw new Error('Empty array');
    }

    if (i >= size) {
      throw new Error('Out of range');
    }
    return this.dynamicArray[i];
  }

  // O(1) at end
  // O(n) at arbitrary value
  deleteAt(i: number): void {
    const size = this.getSize();
    if (0 === size) {
      throw new Error('Empty array');
    }

    if (i >= size) {
      throw new Error('Out of range');
    }

    for(; i < size; i++) {
      this.dynamicArray[i] = this.dynamicArray[i + 1];
    }
    // cheat w/ a built in to update array length
    this.dynamicArray.pop();
  }

  // O(1) at end
  // O(n) at arbitrary value
  insertAt(index: number, val: number): void {
    const size = this.getSize();
    if (size === this.capacity) {
      const replacement = [];
      for (let i = 0; i < size; i++) {
        replacement[i] = this.dynamicArray[i];
      }
      this.dynamicArray = replacement;
      this.capacity*= 2;
    }

    let interator = this.getSize() - 1;
    while (interator >= index) {
      this.dynamicArray[interator + 1] = this.dynamicArray[interator];
      interator--;
    }
    this.dynamicArray[index] = val;
  }

  // O(n)
  find(val: number): number {
    const size = this.getSize();
    for (let i = 0; i < size; i++) {
      if (this.dynamicArray[i] === val) {
        return i;
      }
    }
    return -1;
  }

  // O(1)
  pop(): number {
    const size = this.getSize();
    if (0 === size) {
      throw new Error('Empty array');
    }

    // cheating w/ a built in
    // delete sets the value to undefined
    // and won't update the array length
    return this.dynamicArray.pop();
  }

  // O(n)
  // iterate once to find the index of val
  // and another to update
  // remove first occurence of val
  remove(val: number): void {
    const size = this.getSize();
    let index;
    for (let i = 0; i < size; i++) {
      if (this.dynamicArray[i] === val) {
        index = i;
        break;
      }
    }

    if (!index) {
      throw new Error('Value not found');
    }

    for (; index < size - 1; index++) {
      if (this.dynamicArray[index + 1]) {
        this.dynamicArray[index] = this.dynamicArray[index + 1];
      }
    }
    // always remove the last item since
    // one value gets removed from the array
    this.dynamicArray.pop();
  }
}