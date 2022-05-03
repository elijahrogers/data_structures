import BinaryTree from '../../lib/trees/binary_tree'
let binaryTree, values

test('Successfully intitializes', () => {
  expect(new BinaryTree()).not.toBeUndefined()
})

describe('insert', () => {
  describe('when tree is empty', () => {
    test('adds key at root node', () => {
      binaryTree = new BinaryTree()
      binaryTree.insert(1)

      expect(binaryTree.root.key).toEqual(1)
    })
  })

  describe('when tree has items', () => {
    test('adds key in level order', () => {
      binaryTree = new BinaryTree()
      values = [1, 2, 3, 4]
      values.forEach(key => binaryTree.insert(key))

      expect(binaryTree.root.left.key).toEqual(2)
      expect(binaryTree.root.right.key).toEqual(3)
      expect(binaryTree.root.left.left.key).toEqual(4)
    })
  })
})

describe('deepest', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new BinaryTree().deepest()).toBeNull()
    })
  })

  describe('when tree has nodes', () => {
    test('returns the bottom and rightmost node', () => {
      binaryTree = new BinaryTree()
      values = [1, 2, 3]
      values.forEach(key => binaryTree.insert(key))

      expect(binaryTree.deepest()).toEqual(expect.anything())
      expect(binaryTree.deepest().key).toEqual(3)
    })
  })
})

describe('remove', () => {
  beforeEach(() => {
    binaryTree = new BinaryTree()
    values = [1, 2, 3]
    values.forEach(key => binaryTree.insert(key))
  })

  describe('when key is valid', () => {
    test('removes key from tree', () => {
      expect(binaryTree.root.left.key).toEqual(2)

      binaryTree.remove(2)

      expect(binaryTree.root.left.key).not.toEqual(2)
    })

    test('replaces from the bottom', () => {
      expect(binaryTree.root.left.key).toEqual(2)

      binaryTree.remove(2)

      expect(binaryTree.root.left.key).toEqual(3)
    })
  })

  describe('and node is the deepest', () => {
    test('removes key from tree', () => {
      expect(binaryTree.root.right.key).toEqual(3)

      binaryTree.remove(3)

      expect(binaryTree.root.right).toBeNull()
    })
  })

  describe('when key is invalid', () => {
    test('returns undefined', () => {
      expect(binaryTree.remove(7)).toBeUndefined()
    })
  })

  describe('when tree is empty', () => {
    test("returns 'Invalid Key'", () => {
      expect(new BinaryTree().remove(10)).toEqual('Invalid key')
    })
  })
})

describe('deleteDeepest', () => {
  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new BinaryTree().deleteDeepest()).toBeNull()
    })
  })

  describe('when tree has nodes', () => {
    test('deletes deepest and rightmost node', () => {
      binaryTree = new BinaryTree()
      values = [1, 2, 3]
      values.forEach(key => binaryTree.insert(key))
      binaryTree.deleteDeepest()

      expect(binaryTree.root.right).toBeNull()
    })
  })
})

describe('retrieve', () => {
  beforeAll(() => {
    binaryTree = new BinaryTree()
    values = [1, 2, 3]
    values.forEach(key => binaryTree.insert(key))
  })

  describe('when tree is empty', () => {
    test('returns null', () => {
      expect(new BinaryTree().retrieve(1)).toBeNull()
    })
  })

  describe('when tree has nodes', () => {
    describe('and key is invalid', () => {
      test("returns 'Invalid key'", () => {
        expect(binaryTree.retrieve(4)).toEqual('Invalid key')
      })
    })

    describe('and key is valid', () => {
      test('returns the correct node', () => {
        expect(binaryTree.retrieve(3).key).toEqual(3)
      })
    })
  })
})
