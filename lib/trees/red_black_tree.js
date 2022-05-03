class TreeNode {
  constructor (key = null, color = 'red') {
    this.left = null
    this.right = null
    this.key = key
    this.color = color
  }
}

// Performance (worst case)
//
// Insert: O(log(n))
// Lookup: O(log(n))
// Delete: O(log(n))

class RedBlackTree {
  constructor (...args) {
    this.root = null

    if (args.length !== 0) {
      args.forEach(data => this.insert(data))
    }
  }

  insert (data, node = this.root) {
    this.root = this.insertNode(data, this.root)
    this.root.color = 'black'
    return this.root
  }

  insertNode (data, node) {
    if (node === null) {
      return new TreeNode(data)
    } else if (node.key > data) {
      node.left = this.insertNode(data, node.left)
    } else if (node.key < data) {
      node.right = this.insertNode(data, node.right)
    } else {
      node.key = data
    }

    return this.balance(node)
  }

  search (data, node = this.root) {
    if (this.root === null) {
      return null
    } else if (node === null) {
      return null
    } else if (node.key === data) {
      return node
    } else if (node.key < data) {
      return this.search(data, node.right)
    } else if (node.key > data) {
      return this.search(data, node.left)
    }
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

  delete (data) {
    if (data === null) {
      return null
    }

    if (this.search(data) === null) {
      return null
    }

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = 'red'
    }

    this.root = this.deleteNode(data, this.root)

    if (this.root !== null) {
      this.root.color = 'black'
    }
  }

  deleteNode (data, node) {
    if (data < node.key) {
      if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
        node = this.moveRedLeft(node)
      }

      node.left = this.deleteNode(data, node.left)
    } else {
      if (this.isRed(node.left)) {
        node = this.rotateRight(node)
      }

      if (data === node.key && node.right === null) {
        return null
      }

      if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
        node = this.moveRedRight(node)
      }

      if (data === node.key) {
        node.key = this.min(node.right).key
        node.right = this.deleteMin(node.right)
      } else {
        node.right = this.deleteNode(data, node.right)
      }
    }

    return this.balance(node)
  }

  isRed (node) {
    if (node === null) {
      return false
    } else {
      return node.color === 'red'
    }
  }

  // ------------------------------ Rebalancing -------------------------------//
  rotateLeft (node) {
    const temp = node.right

    node.right = temp.left
    temp.left = node
    temp.color = node.color
    node.color = 'red'

    return temp
  }

  rotateRight (node) {
    const temp = node.left

    node.left = temp.right
    temp.right = node
    temp.color = node.color
    node.color = 'red'

    return temp
  }

  flipColors (node) {
    if (node.color === 'black') {
      node.color = 'red'
      node.left.color = 'black'
      node.right.color = 'black'
    } else {
      node.color = 'black'
      node.left.color = 'red'
      node.right.color = 'red'
    }

    return node
  }

  moveRedLeft (node) {
    this.flipColors(node)

    if (this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right)
      node = this.rotateLeft(node)
      this.flipColors(node)
    }

    return node
  }

  moveRedRight (node) {
    this.flipColors(node)

    if (this.isRed(node.left.left)) {
      node = this.rotateRight(node)
      this.flipColors(node)
    }

    return node
  }

  balance (node) {
    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }

    if (this.isRed(node.left) && this.isRed(node.right)) {
      node = this.flipColors(node)
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
}

export { RedBlackTree, TreeNode }
