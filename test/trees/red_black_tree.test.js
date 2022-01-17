const { RedBlackTree, TreeNode } = require('../../lib/trees/red_black_tree')

test('Successfully intitializes', () => {
  const bst = new RedBlackTree()
  expect(bst).not.toBeUndefined()
})

describe('insert', () => {
  describe('when tree is empty', () => {
    test('inserts a black node', () => {
      const bst = new RedBlackTree()

      bst.insert(0)

      expect(bst.root.key).toEqual(0)
      expect(bst.root.color).toEqual('black')
    })

    test('it returns the root node', () => {
      const bst = new RedBlackTree()
      const node = bst.insert(77)

      expect(node).toBeInstanceOf(TreeNode)
      expect(node).toEqual(bst.root)
    })
  })

  describe('when tree has data', () => {
    test('inserts correctly', () => {
      const bst = new RedBlackTree(0, 1, 2)

      bst.insert(3)

      expect(bst.root.right.key).toEqual(3)
    })

    test('it does not create duplicates', () => {
      const bst = new RedBlackTree(5, 6, 5)

      expect(bst.root.key).toEqual(6)
      expect(bst.root.left.key).toEqual(5)
      expect(bst.root.right).toBeNull()
      expect(bst.root.left.right).toBeNull()
    })
  })

  describe('with sequential values', () => {
    test('it self rebalances', () => {
      const bst = new RedBlackTree(1)

      bst.insert(2)
      bst.insert(3)
      bst.insert(4)

      expect(bst.root.key).toEqual(2)
      expect(bst.root.left.key).toEqual(1)
      expect(bst.root.right.key).toEqual(4)
      expect(bst.root.right.left.key).toEqual(3)
    })
  })

  describe('with a value larger than root', () => {
    test('it performs a left rotation', () => {
      const bst = new RedBlackTree(1)

      bst.insert(5)

      expect(bst.root.key).toEqual(5)
      expect(bst.root.color).toEqual('black')
    })
  })

  describe('with values smaller than root', () => {
    test('it performs a right rotation', () => {
      const bst = new RedBlackTree(10)

      bst.insert(7)
      bst.insert(5)

      expect(bst.root.key).toEqual(7)
      expect(bst.root.color).toEqual('black')
    })
  })
})

describe('search', () => {
  describe('when tree is empty', () => {
    test('it returns null', () => {
      const bst = new RedBlackTree()

      expect(bst.search(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      const bst = new RedBlackTree(7, 5, 18)

      expect(bst.search(1)).toBeNull()
    })
  })

  describe('when value is in tree', () => {
    test('returns the correct node', () => {
      const bst = new RedBlackTree(7, 5, 18)

      expect(bst.search(18)).not.toBeNull()
      expect(bst.search(18).key).toEqual(18)
    })
  })
})

describe('delete', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const bst = new RedBlackTree()

      expect(bst.delete(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      const bst = new RedBlackTree('A', 'B', 'C')

      expect(bst.delete('D')).toBeNull()
    })
  })

  describe('when value is root node', () => {
    test('removes root node', () => {
      const bst = new RedBlackTree('A', 'B', 'C')
      bst.delete('B')

      expect(bst.search('B')).toBeNull()
    })

    test('replaces correct child node', () => {
      const bst = new RedBlackTree('A', 'B', 'C')
      bst.delete('B')

      expect(bst.root.key).toEqual('C')
    })
  })

  describe('when value has no children', () => {
    test('trims the leaf', () => {
      const bst = new RedBlackTree('A', 'B', 'C')
      bst.delete('C')

      expect(bst.search('C')).toBeNull()
      expect(bst.root.right).toBeNull()
    })
  })

  describe('when value has one child', () => {
    test('replaces node with child', () => {
      const bst = new RedBlackTree('D', 'A', 'B', 'C')
      bst.delete('D')

      expect(bst.search('D')).toBeNull()
      expect(bst.root.right.key).toEqual('C')
    })
  })

  describe('when value has two children', () => {
    test('replaces node with predecessor', () => {
      const bst = new RedBlackTree('S', 'E', 'R', 'H', 'M', 'A')
      const node = bst.root.left

      expect(node.key).toEqual('H')
      expect(node.left).toBeInstanceOf(TreeNode)
      expect(node.right).toBeInstanceOf(TreeNode)

      bst.delete('H')

      expect(bst.search('H')).toBeNull()
      expect(bst.root.left.key).toEqual('E')
    })

    test('sets left node of predecessor to original', () => {
      const bst = new RedBlackTree('S', 'E', 'R', 'H', 'M', 'A')
      const node = bst.root.left

      expect(node.key).toEqual('H')
      expect(node.left).toBeInstanceOf(TreeNode)
      expect(node.right).toBeInstanceOf(TreeNode)

      bst.delete('H')

      expect(bst.root.left.left.key).toEqual('A')
    })
  })
})

describe('min', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const bst = new RedBlackTree()

      expect(bst.min()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the minimum value', () => {
      const bst = new RedBlackTree(7, 4, 11, 12)

      expect(bst.min().key).toEqual(4)
    })
  })
})

describe('max', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const bst = new RedBlackTree()

      expect(bst.max()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the maximum value', () => {
      const bst = new RedBlackTree(7, 4, 11, 12)

      expect(bst.max().key).toEqual(12)
    })
  })
})
