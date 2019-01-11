const { default: CircularQueue } = require('../src/CircularQueue');
const { assert, expect } = require('chai');

describe('Circular Queue', () => {
  let queue;
  beforeEach(() => {
    queue = new CircularQueue();
  });

  it('enqueue (throws when queue is full)', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    expect(() => queue.enqueue(5)).to.throw('Queue is full');
  });

  it('enqueue (adds to the end of the queue)', () => {
    assert.isTrue(queue.empty());
    queue.enqueue(1);
    assert.isFalse(queue.empty());
  });

  it('enqueues and dequques multiple items', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    assert.equal(queue.dequeue(), 1);
    assert.equal(queue.dequeue(), 2);
    queue.enqueue(5);
    queue.enqueue(6);
    assert.equal(queue.dequeue(), 3);
    assert.equal(queue.dequeue(), 4);
    assert.equal(queue.dequeue(), 5);
    assert.equal(queue.dequeue(), 6);
  });

  it('dequeue (removes from the front of the queue)', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    assert.equal(queue.dequeue(), 1);
  });

  it('dequeue (throws when queue is empty', () => {
    expect(() => queue.dequeue()).to.throw('Queue is empty');
  });

  it('empty (True when queue is empty', () => {
    assert.isTrue(queue.empty());
  });

  it('empty (False when quque is not empty', () => {
    queue.enqueue(1);
    assert.isFalse(queue.empty());
  });

  it('full (True when queue is full)', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    assert.isTrue(queue.full());
  });

  it('full (False) when queue is not full)', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assert.isFalse(queue.full());
  });
});
