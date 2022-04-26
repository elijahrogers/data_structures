const PriorityQueue = require('../lib/priority_queue')

test('Successfully intitializes', () => {
  const queue = new PriorityQueue()
  expect(queue).not.toBeUndefined()
})

describe('#push', () => {
  test('adds item to queue', () => {
    const queue = new PriorityQueue()
    queue.push('Hello', 0)

    expect(queue.pop()).toEqual('Hello')
  })

  describe('with multiple items of varying priority', () => {
    test('arranges queue by descending priority', () => {
      const queue = new PriorityQueue()
      const values = new Map([['Last', 10], ['3rd', 5], ['2nd', 2], ['1st', 1]])

      values.forEach((priority, item) => queue.push(item, priority))
      expect(queue.pop()).toEqual('1st')
      expect(queue.pop()).toEqual('2nd')
      expect(queue.pop()).toEqual('3rd')
      expect(queue.pop()).toEqual('Last')
    })

    describe('when basis is max', () => {
      test('arranges queue by ascending priority', () => {
        const queue = new PriorityQueue('max')
        const values = new Map([['Last', 1], ['3rd', 5], ['2nd', 10], ['1st', 100]])

        values.forEach((priority, item) => queue.push(item, priority))

        expect(queue.pop()).toEqual('1st')
        expect(queue.pop()).toEqual('2nd')
        expect(queue.pop()).toEqual('3rd')
        expect(queue.pop()).toEqual('Last')
      })
    })
  })
})

describe('#pop', () => {
  describe('when priority queue is empty', () => {
    test('returns undefined', () => {
      const queue = new PriorityQueue()

      expect(queue.pop()).toBeUndefined()
    })
  })

  describe('when priority queue has items', () => {
    test('returns item with lowest priority', () => {
      const queue = new PriorityQueue()
      queue.push('First', 0.1)
      queue.push('Second', 1)

      expect(queue.pop()).toEqual('First')
    })

    test('removes first item from the queue', () => {
      const queue = new PriorityQueue()
      queue.push('First', 0.1)
      queue.push('Second', 1)

      expect(queue.pop()).toEqual('First')
      expect(queue.contains('First')).toEqual(false)
    })

    describe('when basis is max', () => {
      test('returns item with highest priority', () => {
        const queue = new PriorityQueue('max')
        queue.push('First', 10)
        queue.push('Second', 0.1)

        expect(queue.pop()).toEqual('First')
      })

      test('removes first item from the queue', () => {
        const queue = new PriorityQueue('max')
        queue.push('First', 1)
        queue.push('Second', 0.5)

        expect(queue.pop()).toEqual('First')
        expect(queue.contains('First')).toEqual(false)
      })
    })
  })
})

describe('#changeKey', () => {
  describe('when priority queue is empty', () => {
    test('returns undefined', () => {
      const queue = new PriorityQueue()

      expect(queue.changeKey('First', 0.1)).toBeUndefined()
    })
  })

  describe('when priority queue has items', () => {
    describe('but none with a matching priority', () => {
      test('returns undefined', () => {
        const queue = new PriorityQueue()
        queue.push('First', 0.1)
        queue.push('Second', 1)

        expect(queue.changeKey(3, 'Third')).toBeUndefined()
      })
    })

    describe('and one with a matching priority', () => {
      test('changes the key associated with the priority', () => {
        const queue = new PriorityQueue()
        queue.push('First', 1)
        queue.changeKey(1, 'Second')

        expect(queue.pop()).toEqual('Second')
      })
    })
  })
})

describe('#contains', () => {
  describe('when priority queue is empty', () => {
    test('returns false', () => {
      const queue = new PriorityQueue()

      expect(queue.contains('A key')).toBe(false)
    })
  })

  describe('when priority queue has items', () => {
    describe('but no matching key', () => {
      test('returns false', () => {
        const queue = new PriorityQueue()
        queue.push('First', 0.1)
        queue.push('Second', 1)

        expect(queue.contains('Some key')).toBe(false)
      })
    })

    describe('and one with a matching key', () => {
      test('returns true', () => {
        const queue = new PriorityQueue()
        queue.push('First', 1)

        expect(queue.contains('First')).toBe(true)
      })
    })
  })
})

describe('#isEmpty', () => {
  describe('when priority queue has no items', () => {
    test('returns true', () => {
      const queue = new PriorityQueue()

      expect(queue.isEmpty).toEqual(true)
    })
  })

  describe('when priority queue has items', () => {
    test('returns false', () => {
      const queue = new PriorityQueue()
      queue.push('A single item', 0)

      expect(queue.isEmpty).toEqual(false)
    })
  })
})
