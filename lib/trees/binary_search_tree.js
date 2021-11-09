class TreeNode {
  constructor (key = null) {
    this.left = null
    this.right = null
    this.key = key
  }
}

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
}

module.exports = { BinarySearchTree, TreeNode }
