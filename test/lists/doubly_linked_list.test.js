const { DoublyLinkedList, ListNode } = require('../../lib/lists/doubly_linked_list')
let list, values

test('Successfully intitializes', () => {
  expect(new DoublyLinkedList()).not.toBeUndefined()
})

describe('addNode', () => {
  beforeAll(() => {
    list = new DoublyLinkedList()
  })

  test('appends node to end of list', () => {
    list.addNode(1)
    expect(list.head).toBeTruthy()
  })

  test('returns node', () => {
    expect(list.addNode(1)).toBeInstanceOf(ListNode)
  })
})

describe('getNode', () => {
  beforeAll(() => {
    list = new DoublyLinkedList()
    values = [4, 5, 6, 7]
    values.map(value => list.addNode(value))
  })

  describe('when a valid index is provided', () => {
    test('returns the correct node', () => {
      expect(list.getNode(1).data).toEqual(values[1])
    })
  })

  describe('when an invalid index is provided', () => {
    test("returns 'Index invalid'", () => {
      expect(list.getNode(7)).toEqual('Index invalid')
    })
  })
})

describe('removeNode', () => {
  beforeEach(() => {
    list = new DoublyLinkedList()
    values = [4, 5, 6, 7]
    values.map(value => list.addNode(value))
  })

  describe('when a valid index is provided', () => {
    describe('that references the head node', () => {
      test('correctly removes the head', () => {
        list.removeNode(0)

        expect(list.getNode(0).data).toEqual(values[1])
        expect(list.getNode(1).data).toEqual(values[2])
        expect(list.getNode(2).data).toEqual(values[3])
      })

      test('updates previous reference to head', () => {
        list.removeNode(0)

        expect(list.getNode(0).previous).toBeNull()
      })

      describe('and no other nodes exist', () => {
        test('sets tail to null', () => {
          const l = new DoublyLinkedList()
          l.addNode(7)
          l.removeNode(0)

          expect(l.tail).toBeNull()
        })
      })
    })

    describe('that references a middle node', () => {
      test('removes the correct node', () => {
        list.removeNode(1)

        expect(list.getNode(0).data).toEqual(values[0])
        expect(list.getNode(1).data).toEqual(values[2])
        expect(list.getNode(2).data).toEqual(values[3])
      })

      test('updates links of adjacent nodes', () => {
        list.removeNode(1)

        expect(list.getNode(1).data).toEqual(values[2])
        expect(list.getNode(0).next).toEqual(list.getNode(1))
        expect(list.getNode(1).previous).toEqual(list.getNode(0))
      })
    })
  })

  describe('when an invalid index is provided', () => {
    test("returns 'Index invalid'", () => {
      expect(list.removeNode(7)).toEqual('Index invalid')
    })
  })
})
