// Performance (worst case)
//
// Insert: O(log(n))
// Lookup: N/A
// Delete: O(n)
//
// Delete is O(n) because removing with splice() requires re-indexing the array

class BinaryHeap {
  constructor (basis = 'max') {
    this._size = 0
    this.heap = []
    this.basis = basis
  }

  push (key) {
    this.heap[++this._size] = key
    this.swim(this._size)
  }

  pop () {
    const head = this.heap[1]
    this.delete(1)
    return head
  }

  peek () {
    return this.heap[1]
  }

  delete (index) {
    const value = this.heap[index]

    if (typeof (value) !== 'undefined') {
      this.heap.splice(index, 1)
      this._size--
      this.swim(this._size)
      this.sink(1)
    } else {
      return false
    }
  }

  indexOf (value) {
    return this.heap.indexOf(value)
  }

  exchange (indx1, indx2) {
    const temp = this.heap[indx1]
    this.heap[indx1] = this.heap[indx2]
    this.heap[indx2] = temp
  }

  swim (index) {
    while (index > 1 && this.compare(index, this.parentIndex(index))) {
      this.exchange(index, this.parentIndex(index))
      index = this.parentIndex(index)
    }
  }

  sink (index) {
    while (2 * index <= this._size) {
      let childIdx = 2 * index
      if (childIdx < this._size && this.compare(childIdx, childIdx + 1)) {
        childIdx++
      }
      if (this.compare(index, childIdx)) {
        break
      }
      this.exchange(index, childIdx)
      index = childIdx
    }
  }

  compare (a, b) {
    if (this.basis === 'max') {
      return this.heap[a] > this.heap[b]
    } else {
      return this.heap[a] < this.heap[b]
    }
  }

  parentIndex (index) {
    return Math.floor(index / 2)
  }

  parentVal (index) {
    return this.heap[this.parentIndex(index)]
  }

  get size () {
    return this._size
  }

  get isEmpty () {
    return this._size === 0
  }
}

module.exports = { BinaryHeap }
