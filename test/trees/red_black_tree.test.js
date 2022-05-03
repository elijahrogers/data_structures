import { RedBlackTree, TreeNode } from '../../lib/trees/red_black_tree'
let rbt

test('Successfully intitializes', () => {
  expect(new RedBlackTree()).not.toBeUndefined()
})

describe('insert', () => {
  beforeEach(() => {
    rbt = new RedBlackTree()
  })

  describe('when tree is empty', () => {
    test('inserts a black node', () => {
      rbt.insert(0)

      expect(rbt.root.key).toEqual(0)
      expect(rbt.root.color).toEqual('black')
    })

    test('it returns the root node', () => {
      const node = rbt.insert(77)

      expect(node).toBeInstanceOf(TreeNode)
      expect(node).toEqual(rbt.root)
    })
  })

  describe('when tree has data', () => {
    test('inserts correctly', () => {
      rbt = new RedBlackTree(0, 1, 2)

      rbt.insert(3)

      expect(rbt.root.right.key).toEqual(3)
    })

    test('it does not create duplicates', () => {
      rbt = new RedBlackTree(5, 6, 5)

      expect(rbt.root.key).toEqual(6)
      expect(rbt.root.left.key).toEqual(5)
      expect(rbt.root.right).toBeNull()
      expect(rbt.root.left.right).toBeNull()
    })
  })

  describe('with sequential values', () => {
    test('it self rebalances', () => {
      [1, 2, 3, 4].map((key) => rbt.insert(key))

      expect(rbt.root.key).toEqual(2)
      expect(rbt.root.left.key).toEqual(1)
      expect(rbt.root.right.key).toEqual(4)
      expect(rbt.root.right.left.key).toEqual(3)
    })
  })

  describe('with a value larger than root', () => {
    test('it performs a left rotation', () => {
      rbt = new RedBlackTree(1)

      rbt.insert(5)

      expect(rbt.root.key).toEqual(5)
      expect(rbt.root.color).toEqual('black')
    })
  })

  describe('with values smaller than root', () => {
    test('it performs a right rotation', () => {
      rbt = new RedBlackTree(10)

      rbt.insert(7)
      rbt.insert(5)

      expect(rbt.root.key).toEqual(7)
      expect(rbt.root.color).toEqual('black')
    })
  })
})

describe('search', () => {
  beforeAll(() => {
    rbt = new RedBlackTree(7, 5, 18)
  })

  describe('when tree is empty', () => {
    test('it returns null', () => {
      expect(new RedBlackTree().search(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      expect(rbt.search(1)).toBeNull()
    })
  })

  describe('when value is in tree', () => {
    test('returns the correct node', () => {
      expect(rbt.search(18)).not.toBeNull()
      expect(rbt.search(18).key).toEqual(18)
    })
  })
})

describe('delete', () => {
  beforeEach(() => {
    rbt = new RedBlackTree()
  })

  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new RedBlackTree().delete(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      ['A', 'B', 'C'].map((key) => rbt.insert(key))

      expect(rbt.delete('D')).toBeNull()
    })
  })

  describe('when value is root node', () => {
    beforeEach(() => {
      ['A', 'B', 'C'].map((key) => rbt.insert(key))
    })

    test('removes root node', () => {
      rbt.delete('B')

      expect(rbt.search('B')).toBeNull()
    })

    test('replaces correct child node', () => {
      rbt.delete('B')

      expect(rbt.root.key).toEqual('C')
    })
  })

  describe('when value has no children', () => {
    test('trims the leaf', () => {
      ['A', 'B', 'C'].map((key) => rbt.insert(key))
      rbt.delete('C')

      expect(rbt.search('C')).toBeNull()
      expect(rbt.root.right).toBeNull()
    })
  })

  describe('when value has one child', () => {
    test('replaces node with child', () => {
      ['D', 'A', 'B', 'C'].map((key) => rbt.insert(key))
      rbt.delete('D')

      expect(rbt.search('D')).toBeNull()
      expect(rbt.root.right.key).toEqual('C')
    })
  })

  describe('when value has two children', () => {
    let node

    beforeEach(() => {
      rbt = new RedBlackTree('S', 'E', 'R', 'H', 'M', 'A')
      node = rbt.root.left
    })

    test('replaces node with predecessor', () => {
      expect(node.key).toEqual('H')
      expect(node.left).toBeInstanceOf(TreeNode)
      expect(node.right).toBeInstanceOf(TreeNode)

      rbt.delete('H')

      expect(rbt.search('H')).toBeNull()
      expect(rbt.root.left.key).toEqual('E')
    })

    test('sets left node of predecessor to original', () => {
      expect(node.key).toEqual('H')
      expect(node.left).toBeInstanceOf(TreeNode)
      expect(node.right).toBeInstanceOf(TreeNode)

      rbt.delete('H')

      expect(rbt.root.left.left.key).toEqual('A')
    })
  })
})

describe('min', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new RedBlackTree().min()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the minimum value', () => {
      expect(new RedBlackTree(7, 4, 11, 12).min().key).toEqual(4)
    })
  })
})

describe('max', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new RedBlackTree().max()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the maximum value', () => {
      expect(new RedBlackTree(7, 4, 11, 12).max().key).toEqual(12)
    })
  })
})
