const SinglyLinkedList = require('../lists/singly_linked_list')
const Queue = require('../queue')

class Paths {
  constructor (graph, sourceVertex) {
    this.graph = graph
    this.sourceVertex = sourceVertex
    this.returnPath = false
    this.marked = Array(graph.vertices).fill(false)
    this.edgeTo = Array(graph.vertices).fill(null)
    return this
  }

  to (vertex) {
    if (this.returnPath) {
      return this.shortest(vertex)
    } else {
      return this.marked[vertex]
    }
  }

  shortest (vertex) {
    const path = []

    if (this.marked[vertex]) {
      let current = this.edgeTo[vertex]
      path.push(vertex)

      while (current !== null) {
        path.unshift(current)
        current = this.edgeTo[current]
      }
    }

    return path
  }

  breadthFirstSearch (vertex = this.sourceVertex) {
    const queue = new Queue()
    queue.enqueue(vertex)
    this.marked[vertex] = true

    while (!queue.isEmpty) {
      const current = queue.dequeue()
      const adjacent = this.graph.adj(current)

      if (adjacent) {
        adjacent.forEach((adj) => {
          if (!this.marked[adj]) {
            this.edgeTo[adj] = current
            this.marked[adj] = true
            queue.enqueue(adj)
          }
        })
      }
    }

    return this
  }

  depthFirstSearch (vertex = this.sourceVertex) {
    this.marked[vertex] = true
    const adjacent = this.graph.adj(vertex)

    if (adjacent) {
      adjacent.forEach((adj) => {
        if (!this.marked[adj]) {
          this.depthFirstSearch(adj)
        }
      })
    }

    return this
  }

  returnPaths () {
    this.returnPath = true
    return this
  }
}

// Performance (worst case)
//
// Insert: O(1)
// Delete: N/A
// Lookup: O(1)
//
// Insert is O(1) because we assume that the vertices are continuous between 0 and n
// which allows us to validate vertices in constant time (i.e. 0 <= vertex < n).
// Non-continuous vertices should simply be referenced by their (array) index.
//
// Lookup is O(1) but finding a specific edge is O(n) because it requires iterating
// through the list of edges for a given vertex.

class UndirectedGraph {
  constructor (vertices = []) {
    this.vertexCount = vertices.length
    if (!this.validVertices(...vertices)) {
      throw new Error('Invalid vertices')
    }
    this._vertices = vertices
    this._edges = {}
    this.edgeCount = 0
    this._vertices.forEach(vertex => { this._edges[vertex] = new SinglyLinkedList() })
  }

  addEdge (vertex1, vertex2) {
    if (this.validVertices(vertex1, vertex2)) {
      this._edges[vertex1].addNode(vertex2)
      this._edges[vertex2].addNode(vertex1)
      this.edgeCount++
      return true
    } else {
      return false
    }
  }

  adj (vertex) {
    const vert = this._edges[vertex]

    if (vert) {
      return vert.toArray()
    }
  }

  validVertices (...vertices) {
    if (vertices.length === 0) {
      return true
    } else {
      return vertices.every(vertex => vertex < this.vertexCount && vertex >= 0)
    }
  }

  hasPathFrom (sourceVertex) {
    return new Paths(this, sourceVertex).depthFirstSearch()
  }

  shortestPathFrom (sourceVertex) {
    return new Paths(this, sourceVertex).returnPaths().breadthFirstSearch()
  }

  get vertices () {
    return this.vertexCount
  }

  get edges () {
    return this.edgeCount
  }
}

module.exports = UndirectedGraph
