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

    it('getCapacity', () => {
      assert.equal(dArray.getCapacity(), 4);
    });

    it('getSize', () => {
      assert.equal(dArray.getSize(), 0);
    });

    it('isEmpty truthy', () => {
      assert.isTrue(dArray.isEmpty());
    });

    it('isEmpty falsey', () => {
      dArray.append(1);
      assert.isFalse(dArray.isEmpty());
    });

    it('getAt (empty array error)', () => {
      expect(() => dArray.getAt(5)).to.throw('Empty array');
    });

    it('getAt (out of range error)', () => {
      dArray.append(1);
      expect(() => dArray.getAt(5)).to.throw('Out of range');
    });

    it('getAt (returns a value at a given index)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
    });

    it('set (out of range error)', () => {
      expect(() => dArray.set(5, 5)).to.throw('Out of range');
    });

    it('set (updates a value at a given index', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
      assert.equal(dArray.getAt(3), 4);
      dArray.set(0, 2);
      dArray.set(1, 3);
      dArray.set(2, 4);
      dArray.set(3, 5);
      assert.equal(dArray.getAt(0), 2);
      assert.equal(dArray.getAt(1), 3);
      assert.equal(dArray.getAt(2), 4);
      assert.equal(dArray.getAt(3), 5);
    });

    it('append - (with room) - adds to the end', () => {
      assert.equal(dArray.getSize(), 0);
      dArray.append(1);
      assert.equal(dArray.getAt(0), 1);
      dArray.append(2);
      assert.equal(dArray.getAt(1), 2);
    });

    it('append (at capacity) - copies array contents and updates capacity', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.getAt(3), 4);
      assert.equal(dArray.getCapacity(), 4);
      dArray.append(5);
      assert.equal(dArray.getAt(4), 5);
      assert.equal(dArray.getCapacity(), 8);
    });

    it('prepend - (with room) - adds to the beginnning', () => {
      assert.equal(dArray.getSize(), 0);
      dArray.prepend(2);
      assert.equal(dArray.getAt(0), 2);
      dArray.prepend(1);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
    });

    it('prepend (at capacity) - copies array contents and updates capacity', () => {
      dArray.prepend(4);
      dArray.prepend(3);
      dArray.prepend(2);
      dArray.prepend(1);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getCapacity(), 4);
      dArray.prepend(0);
      assert.equal(dArray.getAt(0), 0);
      assert.equal(dArray.getCapacity(), 8);
    });

    it('deleteAt (empty array error)', () => {
      expect(() => dArray.deleteAt(5)).to.throw('Empty array');
    });

    it('deleteAt (out of range error)', () => {
      dArray.append(1);
      expect(() => dArray.deleteAt(5)).to.throw('Out of range');
    });

    it('deleteAt (deletes a value at a given index)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
      assert.equal(dArray.getAt(3), 4);
      dArray.deleteAt(0);
      dArray.deleteAt(1);
      dArray.deleteAt(2);
      dArray.deleteAt(3);
      assert.isNull(dArray.getAt(0));
      assert.isNull(dArray.getAt(1));
      assert.isNull(dArray.getAt(2));
      assert.isNull(dArray.getAt(3));
    });

    it('insertAt - (with room) - adds a value at a given position', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
      dArray.insertAt(1, 5);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 5);
      assert.equal(dArray.getAt(2), 2);
      assert.equal(dArray.getAt(3), 3);
    });

    it('insertAt (at capacity)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.getCapacity(), 4);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
      assert.equal(dArray.getAt(3), 4);
      dArray.insertAt(2, 5);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 5);
      assert.equal(dArray.getAt(3), 3);
      assert.equal(dArray.getAt(4), 4);
      assert.equal(dArray.getCapacity(), 8);
    });

    it('insertAt (with empty indexes)', () => {
      dArray.append(1);
      dArray.append(2);
      dArray.append(3);
      dArray.append(4);
      assert.equal(dArray.getCapacity(), 4);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
      assert.equal(dArray.getAt(3), 4);
      dArray.insertAt(6, 5);
      assert.equal(dArray.getAt(0), 1);
      assert.equal(dArray.getAt(1), 2);
      assert.equal(dArray.getAt(2), 3);
      assert.equal(dArray.getAt(3), 4);
      assert.isUndefined(dArray.getAt(4));
      assert.isUndefined(dArray.getAt(5));
      assert.equal(dArray.getAt(6), 5);
      assert.equal(dArray.getCapacity(), 8);
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

    it('remove (deletes the index of a given value)', () => {

    });

    // it('find', () => {

    // });

  });
});
