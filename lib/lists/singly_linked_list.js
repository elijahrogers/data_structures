class ListNode {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

class SinglyLinkedList {
  constructor () {
    this.head = null
    this._length = 0
  }

  addNode (data) {
    const tail = this.tail

    if (tail === null) {
      this.head = new ListNode(data)
      this._length++
      return this.head
    }

    tail.next = new ListNode(data)
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
}

module.exports = SinglyLinkedList
