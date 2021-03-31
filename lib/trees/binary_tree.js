const Queue = require('../queue')

class Node {
  constructor (key = null) {
    this.left = null
    this.right = null
    this.key = key
  }
}

class BinaryTree {
  constructor () {
    this.root = null
  }

  retrieve (key) {
    if (this.root === null) {
      return null
    }

    const queue = new Queue()
    queue.enqueue(this.root)

    while (!queue.isEmpty) {
      const temp = queue.dequeue()

      if (temp.key === key) {
        return temp
      }

      if (temp.left !== null) {
        queue.enqueue(temp.left)
      }

      if (temp.right !== null) {
        queue.enqueue(temp.right)
      }
    }

    return 'Invalid key'
  }

  insert (key) {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      const queue = new Queue()
      queue.enqueue(this.root)

      while (!queue.isEmpty) {
        const temp = queue.dequeue()

        if (temp.left === null) {
          temp.left = new Node(key)
          break
        } else {
          queue.enqueue(temp.left)
        }

        if (temp.right === null) {
          temp.right = new Node(key)
          break
        } else {
          queue.enqueue(temp.right)
        }
      }
    }
  }

  remove (key) {
    if (this.root === null) {
      return 'Invalid key'
    } else {
      let found = null
      const queue = new Queue()
      queue.enqueue(this.root)

      while (!queue.isEmpty) {
        const temp = queue.dequeue()

        if (temp.key === key) {
          found = temp
        }

        if (temp.left !== null) {
          queue.enqueue(temp.left)
        }

        if (temp.right !== null) {
          queue.enqueue(temp.right)
        }

        if (found !== null) {
          let replacement = this.deepest()

          if (replacement === found) {
            this.deleteDeepest()
          } else {
            found.key = replacement.key
            found.left = replacement.left
            found.right = replacement.right
            replacement = null
          }
        }
      }
    }
  }

  deleteDeepest () {
    const deepest = this.deepest()
    const queue = new Queue()
    let temp = null

    if (this.root === null) {
      return null
    } else {
      queue.enqueue(this.root)

      while (!queue.isEmpty) {
        temp = queue.dequeue()

        if (temp.left === deepest) {
          temp.left = null
        } else if (temp.right === deepest) {
          temp.right = null
        }

        if (temp.right !== null) {
          queue.enqueue(temp.right)
        } else if (temp.left !== null) {
          queue.enqueue(temp.left)
        }
      }
    }
  }

  deepest () {
    const queue = new Queue()
    let temp = null

    if (this.root == null) {
      return null
    } else {
      queue.enqueue(this.root)

      while (!queue.isEmpty) {
        temp = queue.dequeue()

        if (temp.right !== null) {
          queue.enqueue(temp.right)
        } else if (temp.left !== null) {
          queue.enqueue(temp.left)
        }
      }
    }

    return temp
  }
}

module.exports = BinaryTree
