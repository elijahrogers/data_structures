const SinglyLinkedList = require('../lists/singly_linked_list')

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

class Paths {
  constructor (graph, sourceVertex) {
    this.graph = graph
    this.sourceVertex = sourceVertex
    this.marked = Array(graph.vertices).fill(false)
    this.depthFirstSearch(sourceVertex)
  }

  to (vertex) {
    return this.marked[vertex]
  }

  depthFirstSearch (vertex) {
    this.marked[vertex] = true
    const adj = this.graph.adj(vertex)

    if (adj) {
      adj.forEach((adj) => {
        if (!this.marked[adj]) {
          this.depthFirstSearch(adj)
        }
      })
    }
  }
}

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
    return new Paths(this, sourceVertex)
  }

  get vertices () {
    return this.vertexCount
  }

  get edges () {
    return this.edgeCount
  }
}

module.exports = UndirectedGraph
