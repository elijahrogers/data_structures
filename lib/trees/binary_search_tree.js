import Queue from '../queue'

class TreeNode {
  constructor (key = null) {
    this.left = null
    this.right = null
    this.key = key
  }
}

// Performance (worst case)
//
// Insert: O(n)
// Lookup: O(n)
// Delete: O(n)

class BinarySearchTree {
  constructor () {
    this.root = null
  }

  insert (data, node = this.root) {
    let newNode

    if (this.root === null) {
      newNode = new TreeNode(data)
      this.root = newNode
    } else if (node.left === null && node.key > data) {
      newNode = new TreeNode(data)
      node.left = newNode
    } else if (node.right === null && node.key < data) {
      newNode = new TreeNode(data)
      node.right = newNode
    } else if (node.key > data) {
      this.insert(data, node.left)
    } else if (node.key < data) {
      this.insert(data, node.right)
    }

    return newNode
  }

  findNode (key, node = this.root) {
    if (this.root === null) {
      return null
    } else if (node === null) {
      return null
    } else if (node.key === key) {
      return node
    } else if (node.key < key) {
      return this.findNode(key, node.right)
    } else if (node.key > key) {
      return this.findNode(key, node.left)
    }
  }

  search (key) {
    if (this.root === null) {
      return null
    } else {
      const keys = this.inOrder()
      return this.binarySearch(key, keys)
    }
  }

  binarySearch (key, keys, lo = 0, hi = keys.length - 1) {
    let mid = Math.floor(lo + (hi - lo) / 2)

    if (keys[mid] === key) {
      return keys[mid]
    } else if (lo === hi) {
      return null
    } else if (keys[mid] < key) {
      return this.binarySearch(key, keys, ++mid, hi)
    } else if (keys[mid] > key) {
      return this.binarySearch(key, keys, lo, --mid)
    }
  }

  delete (data) {
    this.root = this.deleteNode(data, this.root)
  }

  min (node = this.root) {
    if (node === null) {
      return null
    } else if (node.left === null) {
      return node
    } else {
      return this.min(node.left)
    }
  }

  max (node = this.root) {
    if (node === null) {
      return null
    } else if (node.right === null) {
      return node
    } else {
      return this.max(node.right)
    }
  }

  deleteNode (data, node) {
    if (node === null) {
      return null
    } else if (node.key > data) {
      node.left = this.deleteNode(data, node.left)
    } else if (node.key < data) {
      node.right = this.deleteNode(data, node.right)
    } else {
      if (node.left === null && node.right === null) {
        return null
      } else if (node.left === null) {
        return node.right
      } else if (node.right === null) {
        return node.left
      } else {
        const temp = node
        const replacement = this.inOrderSuccessor(temp)

        node.key = replacement.key
        node.right = this.deleteMin(temp.right)
        node.left = temp.left

        return node
      }
    }
    return node
  }

  deleteMin (node = this.root) {
    if (node.left === null) {
      return node.right
    } else {
      node.left = this.deleteMin(node.left)
    }

    return node
  }

  inOrderSuccessor (node) {
    let temp = node.right

    while (temp.left !== null) {
      temp = temp.left
    }

    return temp
  }

  inOrder (node = this.root) {
    if (node === null) {
      return []
    } else if (node.left === null && node.right === null) {
      return [node.key]
    } else {
      return [...this.inOrder(node.left), node.key, ...this.inOrder(node.right)]
    }
  }

  preOrder (node = this.root) {
    if (node === null) {
      return []
    } else if (node.left === null && node.right === null) {
      return [node.key]
    } else {
      return [node.key, ...this.preOrder(node.left), ...this.preOrder(node.right)]
    }
  }

  postOrder (node = this.root) {
    if (node === null) {
      return []
    } else if (node.left === null && node.right === null) {
      return [node.key]
    } else {
      return [...this.postOrder(node.left), ...this.postOrder(node.right), node.key]
    }
  }

  lvlOrderWithNulls (node) {
    const queue = new Queue()
    const res = []
    queue.enqueue(node)

    while (!queue.isEmpty) {
      const n = queue.dequeue()

      if (n !== null) {
        res.push(n.key)

        if (n.left !== null) {
          queue.enqueue(n.left)
        } else {
          queue.enqueue(null)
        }

        if (n.right !== null) {
          queue.enqueue(n.right)
        } else {
          queue.enqueue(null)
        }
      } else {
        res.push(null)
      }
    }

    return res
  }

  levelOrder (node = this.root) {
    const ordered = this.lvlOrderWithNulls(node)
    let take = 1
    let results = []

    while (ordered.length > 0) {
      let level = []

      for (let i = 0; i < take; i++) {
        level.push(ordered.shift())
      }

      level = level.filter((val) => { return !!val })
      results.push(level)
      take *= 2
    }
    results = results.filter(function (lvl) { return lvl.length > 0 })
    return results
  }
}

export { BinarySearchTree, TreeNode }
