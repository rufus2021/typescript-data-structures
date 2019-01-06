const { default: DynamicArray } = require('../src/DynamicArray');
const { assert, expect } = require('chai');

describe('Dynamic Array', function () {
  let dArray;

  beforeEach(() => {
    dArray = new DynamicArray();
  });

  it('can be instantiated', () => {
    assert.isObject(dArray);
  });

  it('creates an array', () => {
    assert.isArray(dArray.dynamicArray);
  });

  describe('methods', () => {

    it('capacity', () => {
      assert.equal(dArray.capacity(), 4);
    });

    it('size', () => {
      assert.equal(dArray.size(), 0);
    });

    it('empty truthy', () => {
      assert.isTrue(dArray.empty());
    });

    it('empty falsey', () => {
      dArray.append(1);
      assert.isFalse(dArray.empty());
    });

    it('get (empty array error)', () => {
      expect(() => dArray.get(5)).to.throw('Empty array');
    });

    it('get (out of range error)', () => {
      dArray.append(1);
      expect(() => dArray.get(5)).to.throw('Out of range');
    });

    it('get (returns a value at a given index)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
    });

    it('set (out of range error)', () => {
      expect(() => dArray.set(5, 5)).to.throw('Out of range');
    });

    it('set (updates a value at a given index', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      dArray.set(0, 2);
      dArray.set(1, 3);
      dArray.set(2, 4);
      dArray.set(3, 5);
      assert.equal(dArray.get(0), 2);
      assert.equal(dArray.get(1), 3);
      assert.equal(dArray.get(2), 4);
      assert.equal(dArray.get(3), 5);
    });

    it('append - (with room) - adds to the end', () => {
      assert.equal(dArray.size(), 0);
      dArray.append(1);
      assert.equal(dArray.get(0), 1);
      dArray.append(2);
      assert.equal(dArray.get(1), 2);
    });

    it('append (at capacity) - copies array contents and updates capacity', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.get(3), 4);
      assert.equal(dArray.capacity(), 4);
      dArray.append(5);
      assert.equal(dArray.get(4), 5);
      assert.equal(dArray.capacity(), 8);
    });

    it('prepend - (with room) - adds to the beginnning', () => {
      assert.equal(dArray.size(), 0);
      dArray.prepend(2);
      assert.equal(dArray.get(0), 2);
      dArray.prepend(1);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
    });

    it('prepend (at capacity) - copies array contents and updates capacity', () => {
      dArray.prepend(4);
      dArray.prepend(3);
      dArray.prepend(2);
      dArray.prepend(1);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.capacity(), 4);
      dArray.prepend(0);
      assert.equal(dArray.get(0), 0);
      assert.equal(dArray.capacity(), 8);
    });

    it('delete (empty array error)', () => {
      expect(() => dArray.delete(5)).to.throw('Empty array');
    });

    it('delete (out of range error)', () => {
      dArray.append(1);
      expect(() => dArray.delete(5)).to.throw('Out of range');
    });

    it('delete (deletes a value at a given index)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      dArray.delete(0);
      assert.equal(dArray.get(0), 2);
      assert.equal(dArray.get(1), 3);
      assert.equal(dArray.get(2), 4);
    });

    it('insert - (with room) - adds a value at a given position', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      dArray.insert(1, 5);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 5);
      assert.equal(dArray.get(2), 2);
      assert.equal(dArray.get(3), 3);
    });

    it('insert (at capacity)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.capacity(), 4);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      dArray.insert(2, 5);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 5);
      assert.equal(dArray.get(3), 3);
      assert.equal(dArray.get(4), 4);
      assert.equal(dArray.capacity(), 8);
    });

    it('insert (with empty indexes)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.capacity(), 4);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      dArray.insert(6, 5);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      assert.isUndefined(dArray.get(4));
      assert.isUndefined(dArray.get(5));
      assert.equal(dArray.get(6), 5);
      assert.equal(dArray.capacity(), 8);
    });

    it('find (returns the index position of a given value', () => {
      dArray.append(3);
      dArray.append(4);
      dArray.append(5);
      assert.equal(dArray.find(5), 2);
    });

    it('find (returns -1 if value isn\'t found', () => {
      assert.equal(dArray.find(5), -1);
    });

    it('pop (empty array error)', () => {
      expect(() => dArray.pop()).to.throw('Empty array');
    });

    it('pop (returns the last value)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      assert.equal(dArray.pop(), 3);
      assert.equal(dArray.pop(), 2);
      assert.equal(dArray.pop(), 1);
    });

    it('remove (value not found error)', () => {
      expect(() => dArray.remove(3)).to.throw('Value not found');
    });

    it('remove (deletes the last item)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      dArray.remove(4);
      expect(() => dArray.get(3)).to.throw('Out of range');
    });

    it('remove (deletes the index of a given value)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      dArray.remove(2);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 3);
      assert.equal(dArray.get(2), 4);
      expect(() => dArray.get(3)).to.throw('Out of range');
    });

    it('remove with double capacity (deletes the index of a given value)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      dArray.append(5);
      dArray.append(6);
      dArray.append(7);
      dArray.append(8);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      assert.equal(dArray.get(4), 5);
      assert.equal(dArray.get(5), 6);
      assert.equal(dArray.get(6), 7);
      assert.equal(dArray.get(7), 8);
      dArray.remove(6);
      assert.equal(dArray.get(0), 1);
      assert.equal(dArray.get(1), 2);
      assert.equal(dArray.get(2), 3);
      assert.equal(dArray.get(3), 4);
      assert.equal(dArray.get(4), 5);
      assert.equal(dArray.get(5), 7);
      assert.equal(dArray.get(6), 8);
      expect(() => dArray.get(7)).to.throw('Out of range');
    });
  });
});
