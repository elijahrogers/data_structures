class Stack {
  constructor () {
    this.data = []
  }

  push (data) {
    this.data.push(data)
  }

  pop () {
    if (this.isEmpty) {
      return null
    } else {
      return this.data.pop()
    }
  }

  peek () {
    if (this.isEmpty) {
      return null
    } else {
      return this.data[this.data.length - 1]
    }
  }

  get isEmpty () {
    return this.data.length === 0
  }
}

module.exports = Stack
