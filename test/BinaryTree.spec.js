import BinaryTree from '../src/BinaryTree';
import { assert } from 'chai';

describe('Binary Tree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinaryTree(6);
  });

  it('creates a tree with a root from passed value', () => {
    assert.deepEqual(tree.root, {
      value: 6,
      left: null,
      right: null
    });
  });

  it('value is smaller, it inserts to the left', () => {
    tree.insert(tree.root, 5);

    assert.deepEqual(tree.root.left, {
      value: 5,
      left: null,
      right: null
    });
  });

  it('value is larger, it inserts to the right', () => {
    tree.insert(tree.root, 7);

    assert.deepEqual(tree.root.right, {
      value: 7,
      left: null,
      right: null
    });
  });

  it('inserts multiple levels', () => {
    tree.insert(tree.root, 5);
    tree.insert(tree.root, 7);
    tree.insert(tree.root, 9);

    const left = {
      value: 5,
      left: null,
      right: null
    };

    const right = {
      value: 7,
      left: null,
      right: {
        value: 9,
        left: null,
        right: null
      }
    }

    assert.deepEqual(tree.root, {
      value: 6,
      left: left,
      right: right
    });
  });

  it('returns a value if found', () => {
    tree.insert(tree.root, 7);
    tree.insert(tree.root, 10);
    tree.insert(tree.root, 9);
    tree.insert(tree.root, 17);

    assert.equal(tree.find(tree.root, 7), 7);
    assert.equal(tree.find(tree.root, 10), 10);
    assert.equal(tree.find(tree.root, 9), 9);
    assert.equal(tree.find(tree.root, 17), 17);
  });

  it('returns false if a value is not found', () => {
    tree.insert(tree.root, 7);

    assert.isFalse(tree.find(tree.root, 17));
  });
});
