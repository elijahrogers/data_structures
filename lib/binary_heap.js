// Performance (worst case)
//
// Insert: O(log(n))
// Lookup: N/A
// Delete: O(n)
//
// Delete is O(n) because removing wiht splice() requires re-inedexing the array

class BinaryHeap {
  constructor () {
    this._size = 0
    this.heap = []
  }

  push (key) {
    this.heap[++this._size] = key
    this.swim(this._size)
  }

  pop () {
    const max = this.heap[1]
    this.delete(1)
    return max
  }

  peek () {
    return this.heap[1]
  }

  delete (index) {
    const value = this.heap[index]

    if (!value) {
      return false
    } else {
      this.heap.splice(index, 1)
      this._size--
      this.swim(this._size)
      this.sink(1)
    }
  }

  exchange (indx1, indx2) {
    const temp = this.heap[indx1]
    this.heap[indx1] = this.heap[indx2]
    this.heap[indx2] = temp
  }

  swim (index) {
    while (index > 1 && this.heap[index] > this.parentVal(index)) {
      this.exchange(index, this.parentIndex(index))
      index = this.parentIndex(index)
    }
  }

  sink (index) {
    while (2 * index <= this._size) {
      let childIdx = 2 * index
      if (childIdx < this._size && this.heap[childIdx] < this.heap[childIdx + 1]) {
        childIdx++
      }
      if (this.heap[index] > this.heap[childIdx]) {
        break
      }
      this.exchange(index, childIdx)
      index = childIdx
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
