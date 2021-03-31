const BinaryTree = require('../../lib/trees/binary_tree')

test('Successfully intitializes', () => {
  const binaryTree = new BinaryTree()
  expect(binaryTree).not.toBeUndefined()
})

describe('insert', () => {
  describe('when tree is empty', () => {
    test('adds key at root node', () => {
      const binaryTree = new BinaryTree()
      binaryTree.insert(1)

      expect(binaryTree.root.key).toEqual(1)
    })
  })

  describe('when tree has items', () => {
    test('adds key in level order', () => {
      const binaryTree = new BinaryTree()

      binaryTree.insert(1)
      binaryTree.insert(2)
      binaryTree.insert(3)
      binaryTree.insert(4)

      expect(binaryTree.root.left.key).toEqual(2)
      expect(binaryTree.root.right.key).toEqual(3)
      expect(binaryTree.root.left.left.key).toEqual(4)
    })
  })
})

describe('deepest', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const binaryTree = new BinaryTree()

      expect(binaryTree.deepest()).toBeNull()
    })
  })

  describe('when tree has nodes', () => {
    test('returns the bottom and rightmost node', () => {
      const binaryTree = new BinaryTree()

      binaryTree.insert(1)
      binaryTree.insert(2)
      binaryTree.insert(3)

      expect(binaryTree.deepest()).toEqual(expect.anything())
      expect(binaryTree.deepest().key).toEqual(3)
    })
  })
})

describe('remove', () => {
  describe('when key is valid', () => {
    test('removes key from tree', () => {
      const binaryTree = new BinaryTree()

      binaryTree.insert(1)
      binaryTree.insert(2)
      binaryTree.insert(3)

      expect(binaryTree.root.left.key).toEqual(2)

      binaryTree.remove(2)

      expect(binaryTree.root.left.key).not.toEqual(2)
    })

    test('replaces from the bottom', () => {
      const binaryTree = new BinaryTree()

      binaryTree.insert(1)
      binaryTree.insert(2)
      binaryTree.insert(3)

      expect(binaryTree.root.left.key).toEqual(2)

      binaryTree.remove(2)

      expect(binaryTree.root.left.key).toEqual(3)
    })
  })

  describe('and node is the deepest', () => {
    test('removes key from tree', () => {
      const binaryTree = new BinaryTree()

      binaryTree.insert(1)
      binaryTree.insert(2)
      binaryTree.insert(3)

      expect(binaryTree.root.right.key).toEqual(3)

      binaryTree.remove(3)

      expect(binaryTree.root.right).toBeNull()
    })
  })

  describe('when key is not valid', () => {
    test("returns 'Invalid Key'", () => {
      const binaryTree = new BinaryTree()

      expect(binaryTree.remove(3)).toEqual('Invalid key')
    })
  })
})

describe('deleteDeepest', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const binaryTree = new BinaryTree()

      expect(binaryTree.deleteDeepest()).toBeNull()
    })
  })

  describe('when tree has nodes', () => {
    test('deletes deepest and rightmost node', () => {
      const binaryTree = new BinaryTree()

      binaryTree.insert(1)
      binaryTree.insert(2)
      binaryTree.insert(3)

      binaryTree.deleteDeepest()

      expect(binaryTree.root.right).toBeNull()
    })
  })
})

describe('retrieve', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      const binaryTree = new BinaryTree()

      expect(binaryTree.retrieve(1)).toBeNull()
    })
  })

  describe('when tree has nodes', () => {
    describe('and key is invalid', () => {
      test("returns 'Invalid key'", () => {
        const binaryTree = new BinaryTree()

        binaryTree.insert(1)
        binaryTree.insert(2)
        binaryTree.insert(3)

        expect(binaryTree.retrieve(4)).toEqual('Invalid key')
      })
    })

    describe('and key is valid', () => {
      test('returns the correct node', () => {
        const binaryTree = new BinaryTree()

        binaryTree.insert(1)
        binaryTree.insert(2)
        binaryTree.insert(3)

        expect(binaryTree.retrieve(3).key).toEqual(3)
      })
    })
  })
})
