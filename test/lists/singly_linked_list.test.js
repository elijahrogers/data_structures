import { SinglyLinkedList, ListNode } from '../../lib/lists/singly_linked_list'
let list, values

test('Successfully intitializes', () => {
  expect(new SinglyLinkedList()).not.toBeUndefined()
})

describe('addNode', () => {
  beforeAll(() => {
    list = new SinglyLinkedList()
  })

  test('appends node to end of list', () => {
    list.addNode(1, 'a')

    expect(list.tail).toBeTruthy()
  })

  test('returns node', () => {
    expect(list.addNode(1, 'a')).toBeInstanceOf(ListNode)
  })
})

describe('getNode', () => {
  beforeAll(() => {
    list = new SinglyLinkedList()
    values = new Map([[4, 'd'], [5, 'e'], [6, 'f'], [7, 'g']])
    values.forEach((value, key) => list.addNode(key, value))
  })

  describe('when a valid index is provided', () => {
    test('returns the correct node', () => {
      expect(list.getNode(1).data).toEqual(values.get(5))
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
    list = new SinglyLinkedList()
    values = new Map([[4, 'd'], [5, 'e'], [6, 'f'], [7, 'g']])
    values.forEach((value, key) => list.addNode(key, value))
  })

  describe('when a valid index is provided', () => {
    describe('that references the head node', () => {
      test('correctly removes the head', () => {
        list.removeNode(0)

        expect(list.getNode(0).data).toEqual(values.get(5))
        expect(list.getNode(1).data).toEqual(values.get(6))
        expect(list.getNode(2).data).toEqual(values.get(7))
      })
    })

    describe('that references a middle node', () => {
      test('removes the correct node', () => {
        list.removeNode(1)

        expect(list.getNode(0).data).toEqual(values.get(4))
        expect(list.getNode(1).data).toEqual(values.get(6))
        expect(list.getNode(2).data).toEqual(values.get(7))
      })

      test('updates links of adjacent nodes', () => {
        list.removeNode(1)

        expect(list.getNode(1).data).toEqual(values.get(6))
        expect(list.getNode(0).next).toEqual(list.getNode(1))
      })
    })
  })

  describe('when an invalid index is provided', () => {
    test("returns 'Index invalid'", () => {
      expect(list.removeNode(7)).toEqual('Index invalid')
    })
  })
})

describe('#search', () => {
  beforeAll(() => {
    list = new SinglyLinkedList()
    values = new Map([[4, 'd'], [5, 'e'], [6, 'f'], [7, 'g']])
    values.forEach((value, key) => list.addNode(key, value))
  })

  describe('when the list is empty', () => {
    test('returns null', () => {
      const l = new SinglyLinkedList()

      expect(l.search(1)).toBeNull()
    })
  })

  describe('when list contains the key', () => {
    test('returns the correct value', () => {
      expect(list.search(5)).toEqual('e')
    })
  })

  describe('when list does not contain the key', () => {
    test('returns null', () => {
      expect(list.search(8)).toBeNull()
    })
  })
})

describe('#toArray', () => {
  describe('when the list is empty', () => {
    test('returns an empty array', () => {
      expect(new SinglyLinkedList().toArray()).toEqual([])
    })
  })

  describe('when list has nodes', () => {
    test('returns node keys in order', () => {
      const list = new SinglyLinkedList()
      const values = new Map([[4, 'd'], [5, 'e'], [6, 'f'], [7, 'g']])
      values.forEach((value, key) => list.addNode(key, value))

      expect(list.toArray()).toEqual([4, 5, 6, 7])
    })
  })
})
