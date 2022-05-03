// Performance (worst case)
//
// Insert: O(1)
// Lookup: N/A
// Delete: O(n)
//
// Delete (dequeue) has linear time complexity because shift() has to re-index
// all elements in the array to insert at position 0.

export default class Queue {
  constructor () {
    this.items = []
  }

  enqueue (item) {
    this.items.push(item)
  }

  dequeue () {
    if (this.isEmpty) {
      return null
    } else {
      return this.items.shift()
    }
  }

  back () {
    if (this.isEmpty) {
      return null
    } else {
      return this.items[this.items.length - 1]
    }
  }

  front () {
    if (this.isEmpty) {
      return null
    } else {
      return this.items[0]
    }
  }

  get isEmpty () {
    return this.items.length === 0
  }
}
