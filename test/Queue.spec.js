const { default: Queue } = require('../src/Queue');
const { assert } = require('chai');

describe('Queue', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue();
  });

  it('enqueue (adds to the queue)', () => {
    assert.equal(queue.getSize(), 0);
    queue.enqueue(1);
    assert.equal(queue.getSize(), 1);
  });

  it('enqueues and dequques multiple items', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assert.equal(queue.getSize(), 3);

    assert.equal(queue.dequeue(), 1);
    assert.equal(queue.getSize(), 2);

    assert.equal(queue.dequeue(), 2);
    assert.equal(queue.getSize(), 1);

    assert.equal(queue.dequeue(), 3);
    assert.equal(queue.getSize(), 0);
  });

  it('dequeue (removes from the queue)', () => {
    assert.equal(queue.getSize(), 0);
    queue.enqueue(1);
    assert.equal(queue.getSize(), 1);
    const actual = queue.dequeue();
    assert.equal(actual, 1);
    assert.equal(queue.getSize(), 0);
  });

  it('empty (True when queue is empty', () => {
    assert.isTrue(queue.empty());
  });

  it('empty (False when quque is not empty', () => {
    queue.enqueue(1);
    assert.isFalse(queue.empty());
  });
});
