const { SinglyLinkedList } = require('../lists/singly_linked_list')

// Performance (worst case)
//
// Insert: O(1)
// Delete: N/A
// Lookup: O(n)
//
// Insert is O(1) because we assume that the vertices are continuous between 0 and n
// which allows us to validate vertices in constant time (i.e. 0 <= vertex < n).
// Non-continuous vertices should simply be referenced by their (array) index.
//
// Lookup is O(1) but finding a specific edge is O(n) because it requires
// iterating through the list of edges for a given vertex.

class DirectedGraph {
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
      this.edgeCount++
      return true
    } else {
      return false
    }
  }

  adj (vertex) {
    const vert = this._edges[vertex]

    if (vert && vert.head) {
      return vert.getNode(0)
    } else if (vert) {
      return []
    }
  }

  reverse () {
    const newGraph = new DirectedGraph(this._vertices)

    if (this.vertexCount > 0) {
      this._vertices.forEach(vertex => {
        let edge = this.adj(vertex)

        while (edge) {
          newGraph.addEdge(edge.value, vertex)
          edge = edge.next
        }
      })
    }
    return newGraph
  }

  validVertices (...vertices) {
    if (vertices.length === 0) {
      return true
    } else {
      return vertices.every(vertex => vertex < this.vertexCount && vertex >= 0)
    }
  }

  get vertices () {
    return this.vertexCount
  }

  get edges () {
    return this.edgeCount
  }
}

module.exports = DirectedGraph
