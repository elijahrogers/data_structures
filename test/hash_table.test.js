const { HashTable } = require('../lib/hash_table')

test('Successfully intitializes', () => {
  const ht = new HashTable()
  expect(ht).not.toBeUndefined()
})

describe('#initialize', () => {
  describe('when no size is given', () => {
    test('defaults to 101', () => {
      const ht = new HashTable()
      expect(ht.size).toEqual(101)
    })
  })

  describe('when a size is given', () => {
    test('uses the given size', () => {
      const ht = new HashTable(127)
      expect(ht.size).toEqual(127)
    })
  })
})

describe('#insert', () => {
  describe('when table is empty', () => {
    test('inserts the values', () => {
      const ht = new HashTable()

      ht.insert('key', 'value')
      expect(ht.retrieve('key')).toEqual('value')
    })
  })

  describe('when table is not empty', () => {
    test('inserts the values', () => {
      const ht = new HashTable()

      ht.insert('a', 1)
      ht.insert('b', 2)
      ht.insert('c', 3)

      expect(ht.retrieve('c')).toEqual(3)
    })
  })

  describe('when there is a collision', () => {
    test('adds the value to the linked list', () => {
      const ht = new HashTable()

      ht.insert('a', 97)
      ht.insert(97, 'a')

      expect(ht.retrieve(97)).toEqual('a')
    })
  })

  describe('with integer keys', () => {
    test('correctly hashes and stores values', () => {
      const ht = new HashTable()

      ht.insert(1, 'a')
      ht.insert(2, 'b')
      ht.insert(3, 'c')

      expect(ht.retrieve(1)).toEqual('a')
      expect(ht.retrieve(2)).toEqual('b')
      expect(ht.retrieve(3)).toEqual('c')
    })
  })

  describe('with string keys', () => {
    test('correctly hashes and stores values', () => {
      const ht = new HashTable()

      ht.insert('a', 1)
      ht.insert('b', 2)
      ht.insert('c', 3)

      expect(ht.retrieve('a')).toEqual(1)
      expect(ht.retrieve('b')).toEqual(2)
      expect(ht.retrieve('c')).toEqual(3)
    })
  })
})

describe('#retrieve', () => {
  describe('when key is valid', () => {
    test('returns the correct value', () => {
      const ht = new HashTable()

      ht.insert('a', 1)
      ht.insert('b', 2)
      ht.insert('c', 3)

      expect(ht.retrieve('b')).toEqual(2)
    })
  })

  describe('when key is invalid', () => {
    test('returns null', () => {
      const ht = new HashTable()

      ht.insert('a', 1)
      ht.insert('b', 2)
      ht.insert('c', 3)

      expect(ht.retrieve(10)).toBeNull()
    })
  })
})

describe('#delete', () => {
  describe('when key is valid', () => {
    test('removes the value', () => {
      const ht = new HashTable()
      ht.insert('a', 1)
      ht.insert('b', 2)
      ht.insert('c', 3)

      ht.delete('b')

      expect(ht.retrieve('b')).toBeNull()
    })

    test('returns true', () => {
      const ht = new HashTable()
      ht.insert('a', 1)
      ht.insert('c', 3)

      expect(ht.delete('c')).toBeTruthy()
    })
  })

  describe('when key is invalid', () => {
    test('returns null', () => {
      const ht = new HashTable()

      ht.insert('a', 1)
      ht.insert('b', 2)
      ht.insert('c', 3)

      expect(ht.delete(10)).toBeNull()
      expect(ht.retrieve('b')).toEqual(2)
    })
  })
})
