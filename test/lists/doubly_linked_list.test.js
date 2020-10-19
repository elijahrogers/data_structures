const DoublyLinkedList = require('../../lib/lists/doubly_linked_list')

test('Successfully intitializes', () => {
  const list = new DoublyLinkedList()
  expect(list).not.toBeUndefined()
})

describe('addNode', () => {
  test('appends node to end of list', () => {
    const list = new DoublyLinkedList()

    expect(list.addNode(1)).toBeTruthy()
    expect(list.head).toBeTruthy()
  })
})

describe('getNode', () => {
  describe('when a valid index is provided', () => {
    test('returns the correct node', () => {
      const list = new DoublyLinkedList()
      const values = [4, 5, 6, 7]
      values.map(value => list.addNode(value))

      expect(list.getNode(1).data).toEqual(values[1])
    })
  })

  describe('when an invalid index is provided', () => {
    test("returns 'Index invalid'", () => {
      const list = new DoublyLinkedList()
      const values = [4, 5, 6, 7]
      values.map(value => list.addNode(value))

      expect(list.getNode(7)).toEqual('Index invalid')
    })
  })
})

describe('removeNode', () => {
  describe('when a valid index is provided', () => {
    describe('that references the head node', () => {
      test('correctly removes the head', () => {
        const list = new DoublyLinkedList()
        const values = [4, 5, 6, 7]
        values.map(value => list.addNode(value))
        list.removeNode(0)

        expect(list.getNode(0).data).toEqual(values[1])
        expect(list.getNode(1).data).toEqual(values[2])
        expect(list.getNode(2).data).toEqual(values[3])
      })

      test('updates previous reference to head', () => {
        const list = new DoublyLinkedList()
        const values = [4, 5, 6, 7]
        values.map(value => list.addNode(value))
        list.removeNode(0)

        expect(list.getNode(0).previous).toBeNull()
      })

      describe('and no other nodes exist', () => {
        test('sets tail to null', () => {
          const list = new DoublyLinkedList()
          list.addNode(7)
          list.removeNode(0)

          expect(list.tail).toBeNull()
        })
      })
    })

    describe('that references a middle node', () => {
      test('removes the correct node', () => {
        const list = new DoublyLinkedList()
        const values = [4, 5, 6, 7]
        values.map(value => list.addNode(value))
        list.removeNode(1)

        expect(list.getNode(0).data).toEqual(values[0])
        expect(list.getNode(1).data).toEqual(values[2])
        expect(list.getNode(2).data).toEqual(values[3])
      })

      test('updates links of adjacent nodes', () => {
        const list = new DoublyLinkedList()
        const values = [4, 5, 6, 7]
        values.map(value => list.addNode(value))
        list.removeNode(1)

        expect(list.getNode(1).data).toEqual(values[2])
        expect(list.getNode(0).next).toEqual(list.getNode(1))
        expect(list.getNode(1).previous).toEqual(list.getNode(0))
      })
    })
  })

  describe('when an invalid index is provided', () => {
    test("returns 'Index invalid'", () => {
      const list = new DoublyLinkedList()
      const values = [4, 5, 6, 7]
      values.map(value => list.addNode(value))

      expect(list.removeNode(7)).toEqual('Index invalid')
    })
  })
})
