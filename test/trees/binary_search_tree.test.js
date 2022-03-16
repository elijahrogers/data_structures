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

      expect(bst.findNode(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(5)
      bst.insert(18)

      expect(bst.findNode(1)).toBeNull()
    })
  })

  describe('when value is in tree', () => {
    test('returns the correct node', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(5)
      const node = bst.insert(18)

      expect(bst.findNode(18)).toEqual(node)
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

  describe('when value is in tree', () => {
    test('returns the value', () => {
      const bst = new BinarySearchTree()

      bst.insert(7)
      bst.insert(5)
      bst.insert(18)

      expect(bst.search(18)).toEqual(18)
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

      expect(bst.findNode('A')).toBeNull()
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

      expect(bst.findNode('C')).toBeNull()
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

      expect(bst.findNode('A')).toBeNull()
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

      expect(bst.findNode('E')).toBeNull()
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

describe('#inOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      const bst = new BinarySearchTree()

      expect(bst.inOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    test('returns nodes from smallest to largest', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.inOrder()).toEqual(values.sort((f, s) => { return f - s }))
    })
  })
})

describe('#preOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      const bst = new BinarySearchTree()

      expect(bst.preOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    test('starts at root', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.preOrder()[0]).toEqual(bst.root.key)
    })

    test('traverses left subtree first', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.root.left.key).toEqual(4)
      expect(bst.preOrder()[1]).toEqual(4)
    })

    test('traverses depth first', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.root.left.left.left.key).toEqual(1)
      expect(bst.preOrder()[3]).toEqual(1)
    })
  })
})

describe('#postOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      const bst = new BinarySearchTree()

      expect(bst.postOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    test('starts at deepest node in left subtree', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.postOrder()[0]).toEqual(bst.min().key)
    })

    test('traverses left subtree first', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.postOrder()[0]).toBeLessThan(bst.root.key)
    })

    test('ends at root', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.postOrder().slice(-1)[0]).toEqual(bst.root.key)
    })
  })
})

describe('#levelOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      const bst = new BinarySearchTree()

      expect(bst.levelOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    test('starts at root', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.levelOrder()[0]).toEqual([bst.root.key])
    })

    test('returns an array for each level', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.levelOrder().length).toEqual(5)
    })

    test('returns correct nodes for each level', () => {
      const bst = new BinarySearchTree()
      const values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.levelOrder()[0]).toEqual([bst.root.key])
      expect(bst.levelOrder()[1]).toEqual([4, 11])
      expect(bst.levelOrder()[2]).toEqual([2, 5, 8, 12])
    })
  })
})
