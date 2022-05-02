const SortableArray = require('../lib/sortable_array')
let multiTypes, duplicates, nulls

test('Successfully intitializes', () => {
  expect(new SortableArray()).not.toBeUndefined()
})

beforeAll(() => {
  multiTypes = new SortableArray([3, 'x', 1, 5.3, 4])
  duplicates = new SortableArray([3, 3, 2, 1, 4, 5])
  nulls = new SortableArray([null, 3, null, 1, 4, 5])
})

describe('#insertionSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      expect(new SortableArray().insertionSort()).toEqual([])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        expect(multiTypes.insertionSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        expect(duplicates.insertionSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        expect(nulls.insertionSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })
  })
})

describe('#bubbleSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      expect(new SortableArray().bubbleSort()).toEqual([])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        expect(multiTypes.bubbleSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        expect(duplicates.bubbleSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        expect(nulls.bubbleSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })
  })
})

describe('#mergeSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      expect(new SortableArray().mergeSort()).toEqual([])
    })
  })

  describe('when array has one element', () => {
    test('returns the original array', () => {
      expect(new SortableArray([7]).mergeSort()).toEqual([7])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        expect(multiTypes.mergeSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        expect(duplicates.mergeSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        expect(nulls.mergeSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })
  })
})

describe('#quickSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      expect(new SortableArray().quickSort()).toEqual([])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        expect(multiTypes.quickSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        expect(duplicates.quickSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        expect(nulls.quickSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })

    describe('cointaining one element', () => {
      test('returns the original array', () => {
        expect(new SortableArray([7]).quickSort()).toEqual([7])
      })
    })
  })
})

describe('#heapSort', () => {
  describe('when no array is given', () => {
    test('returns an empty array', () => {
      expect(new SortableArray().heapSort()).toEqual([])
    })
  })

  describe('when array is given', () => {
    describe('containing multiple data types', () => {
      test('returns sorted array', () => {
        expect(multiTypes.heapSort()).toEqual([1, 3, 4, 5.3, 'x'])
      })
    })

    describe('containing duplicate values', () => {
      test('returns sorted array', () => {
        expect(duplicates.heapSort()).toEqual([1, 2, 3, 3, 4, 5])
      })
    })

    describe('containing null values', () => {
      test('returns sorted array with nulls first', () => {
        expect(nulls.heapSort()).toEqual([null, null, 1, 3, 4, 5])
      })
    })

    describe('cointaining one element', () => {
      test('returns the original array', () => {
        expect(new SortableArray([7]).heapSort()).toEqual([7])
      })
    })
  })
})
