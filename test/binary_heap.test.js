const { BinaryHeap } = require('../lib/binary_heap')
let bh

test('Successfully intitializes', () => {
  const bh = new BinaryHeap()
  expect(bh).not.toBeUndefined()
})

describe('#push', () => {
  beforeEach(() => {
    bh = new BinaryHeap()
  })

  test('adds the value', () => {
    bh.push(1)

    expect(bh.peek()).toEqual(1)
  })

  test('increments the heap size', () => {
    bh.push(1)

    expect(bh.size).toEqual(1)
  })

  describe('with values in increasing order', () => {
    test('correctly arranges heap', () => {
      const values = [10, 20, 30, 40]

      values.forEach((value) => { bh.push(value) })

      values.reverse().map((i) => {
        expect(bh.pop()).toEqual(i)
      })
    })
  })
})

describe('#pop', () => {
  describe('when heap is max based', () => {
    test('returns the max value', () => {
      const bh = new BinaryHeap()

      bh.push(1)
      bh.push(2)
      bh.push(12)

      expect(bh.pop()).toEqual(12)
    })
  })

  describe('when heap is min based', () => {
    test('returns the min value', () => {
      bh = new BinaryHeap('min')

      bh.push(1)
      bh.push(2)
      bh.push(12)

      expect(bh.pop()).toEqual(1)
    })
  })

  test('decrements the heap size', () => {
    const bh = new BinaryHeap()

    bh.push(1)
    bh.pop()

    expect(bh.size).toEqual(0)
  })

  describe('when heap is empty', () => {
    test('returns undefined', () => {
      bh = new BinaryHeap()

      expect(bh.pop()).toBeUndefined()
    })
  })
})

describe('#delete', () => {
  beforeEach(() => {
    bh = new BinaryHeap()
    bh.push(2)
    bh.push(4)
    bh.push(6)
  })

  describe('when key is valid', () => {
    test('removes the key', () => {
      bh.delete(1)

      for (let i = 0; i < bh.size; i++) {
        expect(bh.pop()).not.toEqual(6)
      }
    })

    test('decrements the heap size', () => {
      bh.delete(1)

      expect(bh.size).toEqual(2)
    })

    test('reheapifies the remaining keys', () => {
      bh.delete(1)

      expect(bh.peek()).toEqual(4)
    })
  })

  describe('when key is invalid', () => {
    test('leaves heap unchanged', () => {
      bh.delete(99)

      expect(bh.size).toEqual(3)
    })

    test('returns false', () => {
      expect(bh.delete(99)).toEqual(false)
    })
  })
})

describe('#isEmpty', () => {
  describe('when heap has no elements', () => {
    test('returns true', () => {
      const bh = new BinaryHeap()

      expect(bh.isEmpty).toEqual(true)
    })
  })

  describe('when heap has elements', () => {
    test('returns false', () => {
      const bh = new BinaryHeap()
      bh.push(1)

      expect(bh.isEmpty).toEqual(false)
    })
  })
})
