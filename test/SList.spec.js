const { default: SList } = require('../src/SList');
const { assert, expect } = require('chai');


describe('Singley Linked List', function () {
  let sList;
  beforeEach(() => {
    sList = new SList();
  });

  after(() => {
    sList = null;
  });

  it('can be instantiated', () => {
    assert.typeOf(sList, 'object');
  });

  it('has default properties set', () => {
    assert.equal(sList.head, null);
    assert.equal(sList.tail, null);
    assert.equal(sList.size, 0);
  });

  describe('with one node', () => {
    it('sets head equal to tail', () => {
      sList.pushFront(1);
      assert.deepEqual(sList.head, sList.tail);
    });
  });

  describe('pushFront', () => {
    beforeEach(() => {
      sList.pushFront(2);
    });

    it('adds a node to the front of the list', () => {
      sList.pushFront(1);
      assert.equal(sList.head.data, 1);
    });

    it('updates the head', () => {
      assert.equal(sList.head.data, 2);
      sList.pushFront(1);
      assert.equal(sList.head.data, 1);
    });

    it('updates the size property', () => {
      assert.equal(sList.size, 1);
      sList.pushFront(1);
      assert.equal(sList.size, 2);
    });
  });

  describe('topFront', () => {
    it('returns the head node', () => {
      sList.pushFront(1);
      assert.equal(sList.topFront(), 1);
    });
  });

  describe('popFront', () => {
    beforeEach(() => {
      sList.pushFront(1);
    });

    it('removes the front node', () => {
      sList.pushFront(2);
      assert.equal(sList.topFront(), 2);
      sList.popFront();
      assert.equal(sList.topFront(), 1);
    });

    it('removes the front node and resets head and tail', () => {
      assert.equal(sList.topFront(), 1);
      assert.equal(sList.size, 1);
      sList.popFront();
      assert.equal(sList.head, null);
      assert.equal(sList.tail, null);
    });

    it('removes the front node and updates the head pointer', () => {
      sList.pushFront(2);
      sList.pushFront(3);
      assert.equal(sList.head.data, 3);
      assert.equal(sList.head.next.data, 2);
      sList.popFront();
      assert.equal(sList.head.data, 2);
      assert.equal(sList.head.next.data, 1);
    });

    it('decrements ths list size', () => {
      sList.pushFront(3);
      assert.equal(sList.size, 2);
      sList.popFront(0);
      assert.equal(sList.size, 1);
    });
  });

  describe('pushBack', () => {
    it('adds a node to the end of the list', () => {
      sList.pushBack(1);
      assert.equal(sList.tail.data, 1);
    });

    it('updates the tail', () => {
      sList.pushBack(1);
      assert.equal(sList.tail.data, 1);
      sList.pushBack(2);
      assert.equal(sList.tail.data, 2);
    });

    it('updates the size property', () => {
      assert.equal(sList.size, 0);
      sList.pushBack(1);
      assert.equal(sList.size, 1);
    });
  });

  describe('topBack', () => {
    it('returns the tail node', () => {
      sList.pushBack(1);
      sList.pushBack(2);
      assert.equal(sList.topBack(), 2);
    });
  });

  describe('popBack', () => {
    beforeEach(() => {
      sList.pushBack(1);
    });

    it('removes the tail node and decrements list size', () => {
      assert.equal(sList.size, 1);
      sList.popBack();
      assert.equal(sList.size, 0);
    });

    it('removes the last node and resets tail', () => {
      assert.equal(sList.topBack(), 1);
      assert.equal(sList.size, 1);
      sList.popBack();
      assert.equal(sList.tail, null);
    });

    it('removes the last node and updates the tail pointer', () => {
      sList.pushBack(2);
      sList.pushBack(3);
      assert.equal(sList.tail.data, 3);
      assert.equal(sList.tail.next, null);
      sList.popBack();
      assert.equal(sList.tail.data, 2);
      assert.equal(sList.tail.next, null);
    });

    it('updates the list size', () => {
      // beforeEach adds to the list
      assert.equal(sList.size, 1);
      sList.popBack();
      assert.equal(sList.size, 0);
    });
  });

  describe('findAt', () => {
    it('throws an empty list error if the list is empty', () => {
      expect(() => sList.findAt(5)).to.throw('Empty list');
    });

    it('throws an out of range error if index is greater than the list size', () => {
      sList.pushFront(1);
      expect(() => sList.findAt(5)).to.throw('Out of range');
    });

    it('returns the data at a passed index', () => {
      sList.pushFront(3);
      sList.pushFront(2);
      sList.pushFront(1);
      assert.equal(sList.findAt(0), 1);
      assert.equal(sList.findAt(1), 2);
      assert.equal(sList.findAt(2), 3);
    });
  });

  describe('erase', () => {
    it('throws an empty list error if the list is empty', () => {
      expect(() => sList.erase(5)).to.throw('Empty list');
    });

    it('throws an out of range error if index is greater than the list size', () => {
      sList.pushFront(1);
      expect(() => sList.erase(5)).to.throw('Out of range');
    });

    it('resets head and tail if the list had one node', () => {
      sList.pushFront(1);
      assert.equal(sList.head.data, 1);
      assert.equal(sList.tail.data, 1);
      sList.popBack();
      assert.equal(sList.head, null);
      assert.equal(sList.tail, null);
    });

    it('updates the head pointer when the first node is removed', () => {
      sList.pushFront(2);
      sList.pushFront(1);
      assert.equal(sList.head.data, 1);
      sList.erase(0);
      assert.equal(sList.head.data, 2);
    });

    it('removes a node', () => {
      sList.pushFront(3);
      sList.pushFront(2);
      sList.pushFront(1);
      assert.equal(sList.findAt(1), 2);
      sList.erase(1);
      assert.equal(sList.findAt(1), 3);
    });

    it('resets the tail if the last node is removed', () => {
      sList.pushFront(3);
      sList.pushFront(2);
      sList.pushFront(1);
      assert.equal(sList.tail.data, 3);
      sList.erase(2);
      assert.equal(sList.tail.data, 2);
    });

    it('decrements ths list size', () => {
      sList.pushFront(3);
      sList.pushFront(2);
      sList.pushFront(1);
      assert.equal(sList.size, 3);
      sList.erase(0);
      assert.equal(sList.size, 2);
    });
  });

  describe('addAfter', () => {
    it('throws an empty list error if the list is empty', () => {
      expect(() => sList.addAfter(1)).to.throw('Empty list');
    });

    it('throws an error if the value to insert after is not found', () => {
      sList.pushFront(1);
      expect(() => sList.addAfter(3)).to.throw('Value to insert after not found');
    });

    it('adds a node', () => {
      sList.pushFront(1);
      expect(() => sList.findAt(1)).to.throw('Out of range');
      sList.addAfter(1, 2);
      assert.equal(sList.findAt(1), 2);
    });

    it('updates the tail', () => {
      sList.pushFront(1);
      assert.equal(sList.tail.data, 1);
      sList.addAfter(1, 2);
      assert.equal(sList.tail.data, 2);
    });

    it('updates the list size', () => {
      sList.pushFront(1);
      assert.equal(sList.size, 1);
      sList.addAfter(1, 2);
      assert.equal(sList.size, 2);
    });
  });

  describe('addBefore', () => {
    it('throws an empty list error if the list is empty', () => {
      expect(() => sList.addBefore(1)).to.throw('Empty list');
    });

    it('throws an error if the value to insert after is not found', () => {
      sList.pushFront(1);
      expect(() => sList.addBefore(3)).to.throw('Value to insert before not found');
    });

    it('adds a node', () => {
      sList.pushFront(1);
      expect(() => sList.findAt(1)).to.throw('Out of range');
      sList.addBefore(1, 2);
      assert.equal(sList.findAt(0), 2);
    });

    it('updates the head if inserting at position 1', () => {
      sList.pushFront(3);
      sList.pushFront(2);
      assert.equal(sList.head.data, 2);
      sList.addBefore(2, 1);
      assert.equal(sList.head.data, 1);
    });

    it('updates the list size', () => {
      sList.pushFront(2);
      assert.equal(sList.size, 1);
      sList.addBefore(2, 1);
      assert.equal(sList.size, 2);
    });
  });

  describe('empty', () => {
    it('returns true if the list is empty', () => {
      assert.equal(sList.empty(), true);
    });

    it('returns false if the list is NOT empty', () => {
      sList.pushFront(1);
      assert.equal(sList.empty(), false);
    })
  });

  describe('getSize', () => {
    it('returns the size of the list', () => {
      sList.pushFront(3);
      sList.pushFront(2);
      sList.pushFront(1);
      assert.equal(sList.getSize(), 3);
    });
  });
});
