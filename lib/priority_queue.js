const { BinaryHeap } = require('./binary_heap')

class PriorityQueue extends BinaryHeap {
  constructor (basis = 'min') {
    super(basis)
    this.priorities = {}
  }

  push (value, priority) {
    this.heap[++this._size] = priority
    this.swim(this._size)
    this.priorities[priority] = value
  }

  pop () {
    const priority = this.heap[1]
    this.delete(1)
    const value = this.priorities[priority]
    delete this.priorities[priority]
    return value
  }

  changeKey (priority, newKey) {
    this.priorities[priority] = newKey
  }

  contains (value) {
    return Object.values(this.priorities).includes(value)
  }
}

module.exports = PriorityQueue
