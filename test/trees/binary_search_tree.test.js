const { BinarySearchTree, TreeNode } = require('../../lib/trees/binary_search_tree')
let bst, values

test('Successfully intitializes', () => {
  expect(new BinarySearchTree()).not.toBeUndefined()
})

describe('insert', () => {
  beforeEach(() => {
    bst = new BinarySearchTree()
  })

  describe('when tree is empty', () => {
    test('inserts at root node', () => {
      bst.insert(0)

      expect(bst.root.key).toEqual(0)
    })

    test('it returns a node', () => {
      expect(bst.insert(77)).toBeInstanceOf(TreeNode)
    })
  })

  describe('when tree has data', () => {
    test('inserts correctly', () => {
      values = [0, 1, 2, 3]
      values.forEach(key => bst.insert(key))

      expect(bst.root.right.right.right.key).toEqual(3)
    })

    test('it does not create duplicates', () => {
      values = [0, 0, 0, 0]
      values.forEach(key => bst.insert(key))

      expect(bst.inOrder()).toEqual([0])
    })
  })
})

describe('search', () => {
  beforeEach(() => {
    bst = new BinarySearchTree()
  })

  describe('when tree is empty', () => {
    test('it returns null', () => {
      expect(new BinarySearchTree().findNode(1)).toBeNull()
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      values = [0, 7, 8, 92]
      values.forEach(key => bst.insert(key))

      expect(bst.findNode(1)).toBeNull()
    })
  })

  describe('when value is in tree', () => {
    test('returns the correct node', () => {
      const n = bst.insert(18)

      expect(bst.findNode(18)).toEqual(n)
    })
  })
})

describe('search', () => {
  beforeAll(() => {
    bst = new BinarySearchTree()
    values = [7, 5, 18]
    values.forEach(key => bst.insert(key))
  })

  describe('when tree is empty', () => {
    test('it returns null', () => {
      expect(new BinarySearchTree().search(1)).toBeNull()
    })
  })

  describe('when value is in tree', () => {
    test('returns the value', () => {
      expect(bst.search(18)).toEqual(18)
    })
  })

  describe('when value is not in tree', () => {
    test('returns null', () => {
      expect(bst.search(1)).toBeNull()
    })
  })
})

describe('delete', () => {
  beforeEach(() => {
    bst = new BinarySearchTree()
    values = ['A', 'B', 'C']
    values.forEach(key => bst.insert(key))
  })

  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new BinarySearchTree().delete(1)).toBeUndefined()
    })
  })

  describe('when value is not in tree', () => {
    test('returns undefined', () => {
      expect(bst.delete('D')).toBeUndefined()
    })
  })

  describe('when value is root node', () => {
    test('removes root node', () => {
      bst.delete('A')

      expect(bst.findNode('A')).toBeNull()
    })

    test('replaces correct child node', () => {
      bst.delete('A')

      expect(bst.root.key).toEqual('B')
    })
  })

  describe('when value has no children', () => {
    test('trims the leaf', () => {
      bst.delete('C')

      expect(bst.findNode('C')).toBeNull()
      expect(bst.root.right.right).toBeNull()
    })
  })

  describe('when value has one child', () => {
    beforeEach(() => {
      bst = new BinarySearchTree()
      values = ['D', 'A', 'B', 'C']
      values.forEach(key => bst.insert(key))
    })

    test('replaces node with child', () => {
      bst.delete('A')

      expect(bst.findNode('A')).toBeNull()
      expect(bst.root.left.key).toEqual('B')
    })
  })

  describe('when value has two children', () => {
    beforeEach(() => {
      bst = new BinarySearchTree()
      values = ['S', 'E', 'R', 'H', 'M', 'A']
      values.forEach(key => bst.insert(key))
    })

    test('replaces node with successor', () => {
      bst.delete('E')

      expect(bst.findNode('E')).toBeNull()
      expect(bst.root.left.key).toEqual('H')
    })

    test('sets left node of successor to original', () => {
      bst.delete('E')

      expect(bst.root.left.left.key).toEqual('A')
    })
  })
})

describe('min', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new BinarySearchTree().min()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the minimum value', () => {
      bst = new BinarySearchTree()
      values = [7, 4, 11, 12]
      values.forEach(key => bst.insert(key))

      expect(bst.min().key).toEqual(4)
    })
  })
})

describe('max', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new BinarySearchTree().max()).toBeNull()
    })
  })

  describe('when tree has data', () => {
    test('returns the maximum value', () => {
      bst = new BinarySearchTree()
      values = [7, 4, 11, 12]
      values.forEach(key => bst.insert(key))

      expect(bst.max().key).toEqual(12)
    })
  })
})

describe('#inOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      expect(new BinarySearchTree().inOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    test('returns nodes from smallest to largest', () => {
      bst = new BinarySearchTree()
      values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))

      expect(bst.inOrder()).toEqual(values.sort((f, s) => { return f - s }))
    })
  })
})

describe('#preOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      expect(new BinarySearchTree().preOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    beforeAll(() => {
      bst = new BinarySearchTree()
      values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]
      values.forEach(key => bst.insert(key))
    })

    test('starts at root', () => {
      expect(bst.preOrder()[0]).toEqual(bst.root.key)
    })

    test('traverses left subtree first', () => {
      expect(bst.root.left.key).toEqual(4)
      expect(bst.preOrder()[1]).toEqual(4)
    })

    test('traverses depth first', () => {
      expect(bst.root.left.left.left.key).toEqual(1)
      expect(bst.preOrder()[3]).toEqual(1)
    })
  })
})

describe('#postOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      expect(new BinarySearchTree().postOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    beforeAll(() => {
      bst = new BinarySearchTree()
      values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]

      values.forEach(key => bst.insert(key))
    })

    test('starts at deepest node in left subtree', () => {
      expect(bst.postOrder()[0]).toEqual(bst.min().key)
    })

    test('traverses left subtree first', () => {
      expect(bst.postOrder()[0]).toBeLessThan(bst.root.key)
    })

    test('ends at root', () => {
      expect(bst.postOrder().slice(-1)[0]).toEqual(bst.root.key)
    })
  })
})

describe('#levelOrder', () => {
  describe('when tree is empty', () => {
    test('returns an empty array', () => {
      expect(new BinarySearchTree().levelOrder()).toEqual([])
    })
  })

  describe('when tree has nodes', () => {
    beforeAll(() => {
      bst = new BinarySearchTree()
      values = [7, 4, 11, 12, 2, 1, 3, 5, 6, 8, 9, 10]
      values.forEach(key => bst.insert(key))
    })

    test('starts at root', () => {
      expect(bst.levelOrder()[0]).toEqual([bst.root.key])
    })

    test('returns an array for each level', () => {
      expect(bst.levelOrder().length).toEqual(5)
    })

    test('returns correct nodes for each level', () => {
      expect(bst.levelOrder()[0]).toEqual([bst.root.key])
      expect(bst.levelOrder()[1]).toEqual([4, 11])
      expect(bst.levelOrder()[2]).toEqual([2, 5, 8, 12])
    })
  })
})
