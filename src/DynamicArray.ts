interface DynamicArrayContract {
  getSize(): number;
  empty(): boolean;
  append(val: number): void;
  prepend(val: number): void;
  set(i: number, val: number): void;
  get(i: number): number;
  delete(i: number): void;
  insert(i: number, val: number): void;
  find(val: number): number;
  pop(): number;
  remove(val: number): void;
}

/**
 * A dynamic array implementation using int8Array.
 * Note that when removing items this class sets
 * the removed item value to null for clarity. But
 * when checking the value will be 0 since int8Array
 * allows only integers
 */
export default class DynamicArray implements DynamicArrayContract {
  private dynamicArray: Int8Array;
  private capacity: number;
  private size: number;

  constructor() {
    this.dynamicArray = new Int8Array(4);
    this.capacity = 4;
    this.size = 0;
  }

  getSize(): number {
    return this.size;
  }

  empty(): boolean {
    return this.size === 0;
  }

  // O(1) if not at capacity
  // O(n) if at capacity
  append(val: number): void {
    const size = this.size;
    if (size === this.capacity) {
      // 1. create a new array of 2x size
      // 2. copy contents to new array
      // 3. add new value to the end
      // 4. replace old array with new
      // 5. update capacity and size
      this.capacity *= 2;
      const replacement = new Int8Array(this.capacity);
      for (let i = 0; i < size; i++) {
        replacement[i] = this.dynamicArray[i];
      }

      replacement[size] = val;
      this.dynamicArray = replacement;
    } else {
      this.dynamicArray[size] = val;
    }
    this.size++;
  }

  // O(n)
  prepend(val: number): void {
    let size = this.getSize();
    if (size === this.capacity) {
      // 1. create a new array
      // 2. copy contents to new array (moving each item forward 1 place)
      // 3. add new value to the beginning
      // 4. replace old array with new
      // 5. update capacity and size
      const replacement = new Int8Array(this.capacity * 2);
      for (let i = 0; i < size; i++) {
        replacement[i + 1] = this.dynamicArray[i];
      }
      this.capacity *= 2;
      replacement[0] = val;
      this.dynamicArray = replacement;
    } else {
      while (size > 0) {
        // 1. start at the end, moving each i - 1 forward 1 place
        // 2. add to the beginning
        this.dynamicArray[size] = this.dynamicArray[size - 1];
        size--;
      }
      this.dynamicArray[0] = val;
    }
    this.size++;
  }

  // O(1)
  set(i: number, val: number): void {
    if (i >= this.size) {
      throw new Error("Out of range");
    }

    this.dynamicArray[i] = val;
  }

  // return value at index
  // O(1)
  get(i: number) {
    const size = this.getSize();
    if (0 === size) {
      throw new Error("Empty array");
    }

    if (i >= this.capacity) {
      throw new Error("Out of range");
    }
    return this.dynamicArray[i];
  }

  // O(1) at end
  // O(n) at arbitrary value
  delete(i: number): void {
    const size = this.getSize();
    if (0 === size) {
      throw new Error("Empty array");
    }

    if (i >= size) {
      throw new Error("Out of range");
    }

    for (; i < size; i++) {
      this.dynamicArray[i] = this.dynamicArray[i + 1];
    }

    // cheat w/ a built in to update array length
    this.dynamicArray[size - 1] = null;
    this.size--;

    if (this.size === this.capacity / 4) {
      this.capacity /= 2;
    }
  }

  // O(1) at end
  // O(n) at arbitrary value
  insert(index: number, val: number): void {
    const size = this.getSize();
    if (size === this.capacity) {
      this.capacity *= 2;
      const replacement = new Int8Array(this.capacity);
      for (let i = 0; i < size; i++) {
        replacement[i] = this.dynamicArray[i];
      }
      this.dynamicArray = replacement;
    }

    let interator = this.getSize() - 1;
    while (interator >= index) {
      this.dynamicArray[interator + 1] = this.dynamicArray[interator];
      interator--;
    }
    this.dynamicArray[index] = val;
    this.size++;
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
      throw new Error("Empty array");
    }

    const last = this.dynamicArray[size - 1];
    this.dynamicArray[size - 1] = null;
    this.size--;

    if (this.size === this.capacity / 4) {
      this.capacity /= 2;
    }

    return last;
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
      throw new Error("Value not found");
    }

    for (; index < size - 1; index++) {
      if (this.dynamicArray[index + 1]) {
        this.dynamicArray[index] = this.dynamicArray[index + 1];
      }
    }
    // always remove the last item since
    // one value gets removed from the array
    this.dynamicArray[size - 1] = null;
    this.size--;
    if (this.size === this.capacity / 4) {
      this.capacity /= 2;
    }
  }
}
