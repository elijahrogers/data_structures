class Queue {
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

module.exports = Queue
