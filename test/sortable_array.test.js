const SortableArray = require('../lib/sortable_array')

test('Successfully intitializes', () => {
  const sortable = new SortableArray()
  expect(sortable).not.toBeUndefined()
})

describe('#insertionSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      const sortable = new SortableArray()

      expect(sortable.insertionSort()).toEqual([])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        const sortable = new SortableArray([3, 'x', 1, 5.3, 4])

        expect(sortable.insertionSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        const sortable = new SortableArray([3, 3, 2, 1, 4, 5])

        expect(sortable.insertionSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        const sortable = new SortableArray([null, 3, null, 1, 4, 5])

        expect(sortable.insertionSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })
  })
})

describe('#bubbleSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      const sortable = new SortableArray()

      expect(sortable.bubbleSort()).toEqual([])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        const sortable = new SortableArray([3, 'x', 1, 5.3, 4])

        expect(sortable.bubbleSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        const sortable = new SortableArray([3, 3, 2, 1, 4, 5])

        expect(sortable.bubbleSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        const sortable = new SortableArray([null, 3, null, 1, 4, 5])

        expect(sortable.bubbleSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })
  })
})

describe('#mergeSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      const sortable = new SortableArray()

      expect(sortable.mergeSort()).toEqual([])
    })
  })

  describe('when array has one element', () => {
    test('returns the original array', () => {
      const sortable = new SortableArray([7])

      expect(sortable.mergeSort()).toEqual([7])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        const sortable = new SortableArray([3, 'x', 1, 5.3, 4])

        expect(sortable.mergeSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        const sortable = new SortableArray([3, 3, 2, 1, 4, 5])

        expect(sortable.mergeSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        const sortable = new SortableArray([null, 3, null, 1, 4, 5])

        expect(sortable.mergeSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })
  })
})
