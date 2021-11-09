const { BinarySearchTree, TreeNode } = require('../../lib/trees/binary_search_tree')

test('Successfully intitializes', () => {
  const bst = new BinarySearchTree()
  expect(bst).not.toBeUndefined()
})

describe('insert', () => {
  describe('when tree is empty', () => {
    test('inserts at root node', () => {
      const bst = new BinarySearchTree()

      bst.insert(0)

      expect(bst.root.key).toEqual(0)
    })

    test('it returns a node', () => {
      const bst = new BinarySearchTree()

      const node = bst.insert(77)

      expect(node).toBeInstanceOf(TreeNode)
    })
  })

  describe('when tree has data', () => {
    test('inserts correctly', () => {
      const bst = new BinarySearchTree()

      bst.insert(0)
      bst.insert(1)
      bst.insert(2)
      bst.insert(3)

      expect(bst.root.right.right.right.key).toEqual(3)
    })

    test('it does not create duplicates', () => {
      const bst = new BinarySearchTree()

      bst.insert(5)
      bst.insert(6)
      bst.insert(5)

      expect(bst.root.key).toEqual(5)
      expect(bst.root.right.key).toEqual(6)
      expect(bst.root.left).toBeNull()
      expect(bst.root.right.right).toBeNull()
      expect(bst.root.right.left).toBeNull()
    })
  })
})

describe('search', () => {
  describe('when tree is empty', () => {
    test('it returns null', () => {
      const bst = new BinarySearchTree()

      expect(bst.search(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(5)
      bst.insert(18)

      expect(bst.search(1)).toBeNull()
    })
  })

  describe('when value is in tree', () => {
    test('returns the correct node', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(5)
      const node = bst.insert(18)

      expect(bst.search(18)).toEqual(node)
    })
  })
})

describe('delete', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const bst = new BinarySearchTree()

      expect(bst.delete(1)).toBeUndefined()
    })
  })

  describe('when value is not in tree', () => {
    test('returns undefined', () => {
      const bst = new BinarySearchTree()

      bst.insert('A')
      bst.insert('B')
      bst.insert('C')

      expect(bst.delete('D')).toBeUndefined()
    })
  })

  describe('when value is root node', () => {
    test('removes root node', () => {
      const bst = new BinarySearchTree()

      bst.insert('A')
      bst.insert('B')
      bst.insert('C')

      bst.delete('A')

      expect(bst.search('A')).toBeNull()
    })

    test('replaces correct child node', () => {
      const bst = new BinarySearchTree()

      bst.insert('A')
      bst.insert('B')
      bst.insert('C')

      bst.delete('A')

      expect(bst.root.key).toEqual('B')
    })
  })

  describe('when value has no children', () => {
    test('trims the leaf', () => {
      const bst = new BinarySearchTree()

      bst.insert('A')
      bst.insert('B')
      bst.insert('C')

      bst.delete('C')

      expect(bst.search('C')).toBeNull()
      expect(bst.root.right.right).toBeNull()
    })
  })

  describe('when value has one child', () => {
    test('replaces node with child', () => {
      const bst = new BinarySearchTree()

      bst.insert('D')
      bst.insert('A')
      bst.insert('B')
      bst.insert('C')

      bst.delete('A')

      expect(bst.search('A')).toBeNull()
      expect(bst.root.left.key).toEqual('B')
    })
  })

  describe('when value has two children', () => {
    test('replaces node with successor', () => {
      const bst = new BinarySearchTree()

      bst.insert('S')
      bst.insert('E')
      bst.insert('R')
      bst.insert('H')
      bst.insert('M')
      bst.insert('A')

      bst.delete('E')

      expect(bst.search('E')).toBeNull()
      expect(bst.root.left.key).toEqual('H')
    })

    test('sets left node of successor to original', () => {
      const bst = new BinarySearchTree()

      bst.insert('S')
      bst.insert('E')
      bst.insert('R')
      bst.insert('H')
      bst.insert('M')
      bst.insert('A')

      bst.delete('E')

      expect(bst.root.left.left.key).toEqual('A')
    })
  })
})

describe('min', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const bst = new BinarySearchTree()

      expect(bst.min()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the minimum value', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(4)
      bst.insert(11)
      bst.insert(12)

      expect(bst.min().key).toEqual(4)
    })
  })
})

describe('max', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const bst = new BinarySearchTree()

      expect(bst.max()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the maximum value', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(4)
      bst.insert(11)
      bst.insert(12)

      expect(bst.max().key).toEqual(12)
    })
  })
})
