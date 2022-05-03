import HashTable from '../lib/hash_table'
let ht, values

test('Successfully intitializes', () => {
  expect(new HashTable()).not.toBeUndefined()
})

describe('#initialize', () => {
  describe('when no size is given', () => {
    test('defaults to 101', () => {
      expect(new HashTable().size).toEqual(101)
    })
  })

  describe('when a size is given', () => {
    test('uses the given size', () => {
      expect(new HashTable(127).size).toEqual(127)
    })
  })
})

describe('#insert', () => {
  beforeEach(() => {
    ht = new HashTable()
    values = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
  })

  describe('when table is empty', () => {
    test('inserts the values', () => {
      ht = new HashTable()
      ht.insert('key', 'value')

      expect(ht.retrieve('key')).toEqual('value')
    })
  })

  describe('when table is not empty', () => {
    test('inserts the values', () => {
      values.forEach((value, key) => ht.insert(value, key))

      expect(ht.retrieve('c')).toEqual(3)
    })
  })

  describe('when there is a collision', () => {
    test('adds the value to the linked list', () => {
      ht.insert('a', 97)
      ht.insert(97, 'a')

      expect(ht.retrieve(97)).toEqual('a')
    })
  })

  describe('with integer keys', () => {
    test('correctly hashes and stores values', () => {
      values.forEach((value, key) => ht.insert(key, value))

      expect(ht.retrieve(1)).toEqual('a')
      expect(ht.retrieve(2)).toEqual('b')
      expect(ht.retrieve(3)).toEqual('c')
    })
  })

  describe('with string keys', () => {
    test('correctly hashes and stores values', () => {
      values.forEach((value, key) => ht.insert(value, key))

      expect(ht.retrieve('a')).toEqual(1)
      expect(ht.retrieve('b')).toEqual(2)
      expect(ht.retrieve('c')).toEqual(3)
    })
  })
})

describe('#retrieve', () => {
  beforeAll(() => {
    ht = new HashTable()
    values = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    values.forEach((value, key) => ht.insert(value, key))
  })

  describe('when key is valid', () => {
    test('returns the correct value', () => {
      expect(ht.retrieve('b')).toEqual(2)
    })
  })

  describe('when key is invalid', () => {
    test('returns null', () => {
      expect(ht.retrieve(10)).toBeNull()
    })
  })
})

describe('#delete', () => {
  beforeEach(() => {
    ht = new HashTable()
    values = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    values.forEach((value, key) => ht.insert(value, key))
  })

  describe('when key is valid', () => {
    test('removes the value', () => {
      ht.delete('b')

      expect(ht.retrieve('b')).toBeNull()
    })

    test('returns true', () => {
      expect(ht.delete('c')).toBeTruthy()
    })
  })

  describe('when key is invalid', () => {
    test('returns null', () => {
      expect(ht.delete(10)).toBeNull()
    })
  })
})
