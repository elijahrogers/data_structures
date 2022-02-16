class ListNode {
  constructor (key, data = null) {
    this.key = key
    this.data = data
    this.next = null
  }

  get value () {
    if (this.data) {
      return this.data
    } else {
      return this.key
    }
  }
}

class SinglyLinkedList {
  constructor () {
    this.head = null
    this._length = 0
  }

  addNode (key, data = null) {
    const tail = this.tail

    if (tail === null) {
      this.head = new ListNode(key, data)
      this._length++
      return this.head
    }

    tail.next = new ListNode(key, data)
    this._length++

    return tail.next
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
    current = null
    this._length--

    return true
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

  get tail () {
    let current = this.head

    if (current === null) {
      return null
    }

    while (current.next !== null) {
      current = current.next
    }

    return current
  }

  get length () {
    return this._length
  }
}

module.exports = SinglyLinkedList
