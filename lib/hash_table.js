const { SinglyLinkedList } = require('./lists/singly_linked_list')

// Performance (worst case)
//
// Insert: O(n)
// Lookup: O(n)
// Delete: O(n)

class HashTable {
  constructor (size = 101) {
    this.size = size
    this.values = new Array(size)
  }

  insert (key, value) {
    const index = this.hash(key)

    if (!this.values[index]) {
      this.values[index] = new SinglyLinkedList()
    }

    this.values[index].addNode(key, value)
  }

  retrieve (key) {
    const hash = this.hash(key)
    const bucket = this.values[hash]
    let value = null

    if (!bucket) {
      value = null
    } else {
      let node = bucket.getNode(0)
      let found = false

      if (node === 'Index invalid') {
        value = null
      } else {
        while (found === false) {
          if (node.key === key) {
            value = node.data
            found = true
          } else {
            node = node.next
          }

          if (node === null) {
            value = null
            found = true
          }
        }
      }
    }
    return value
  }

  delete (key) {
    const hash = this.hash(key)
    const bucket = this.values[hash]

    if (!bucket) {
      return null
    } else {
      let index = 0
      let node = bucket.getNode(index)

      while (index < bucket.length) {
        if (node.key === key) {
          bucket.removeNode(index)
          index = bucket.length + 1
          return true
        } else {
          node = node.next
          index++
        }

        if (node === null) {
          index = bucket.length + 1
          return null
        }
      }
    }
  }

  hash (key) {
    if (typeof (key) === 'string') {
      return this.hashString(key)
    } else {
      return key % this.size
    }
  }

  hashString (str) {
    if (str.length === 0) return 0
    let hash = 0

    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i)
    }

    return hash % this.size
  }
}

module.exports = { HashTable, SinglyLinkedList }
