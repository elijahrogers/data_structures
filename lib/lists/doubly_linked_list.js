class ListNode {
  constructor (data, prev = null) {
    this.data = data
    this.next = null
    this.previou = prev
  }
}

// Performance (worst case)
//
// Insert: O(1)
// Lookup: O(n)
// Delete: O(n)

class DoublyLinkedList {
  constructor () {
    this.head = null
    this._length = 0
    this.tail = null
  }

  addNode (data) {
    const node = new ListNode(data)

    if (this._length) {
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this._length++
    return node
  }

  getNode (index) {
    let current = this.head
    let count = 0
    const length = this._length

    if ((index + 1) > length || index < 0) {
      return 'Index invalid'
    }

    while (count < index) {
      current = current.next
      count++
    }

    return current
  }

  removeNode (index) {
    let previousNode = null
    let current = this.head
    let count = 0
    const length = this._length

    if ((index + 1) > length || index < 0) {
      return 'Index invalid'
    }

    if (index === 0) {
      this.head = current.next

      if (this.head === null) {
        this.tail = null
      } else {
        this.head.previous = null
      }
      current = null
      this._length--
      return true
    }

    while (count < index) {
      previousNode = current
      current = current.next
      count++
    }

    previousNode.next = current.next
    previousNode.next.previous = current.previous
    current = null
    this._length--

    return true
  }
}

module.exports = DoublyLinkedList
