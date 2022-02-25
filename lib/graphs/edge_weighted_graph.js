class Edge {
  constructor (vertex1, vertex2, weight) {
    if (arguments.length < 3) {
      throw new Error('Not enough arguments')
    }
    this.vertex1 = vertex1
    this.vertex2 = vertex2
    this.weight = weight
  }

  either () {
    return this.vertex1
  }

  other (vertex) {
    if (vertex === this.vertex1) {
      return this.vertex2
    } else if (vertex === this.vertex2) {
      return this.vertex1
    } else {
      return null
    }
  }

  compareTo (edge) {
    if (this.weight < edge.weight) {
      return -1
    } else if (this.weight > edge.weight) {
      return 1
    } else {
      return 0
    }
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

class EdgeWeightedGraph {
  constructor (vertices = []) {
    this.vertexCount = vertices.length
    if (!this.validVertices(...vertices)) {
      throw new Error('Invalid vertices')
    }
    this._vertices = vertices
    this._edges = {}
    this.edgeCount = 0

    this._vertices.forEach(vertex => { this._edges[vertex] = [] })
  }

  addEdge (vertex1, vertex2, weight) {
    if (this.validVertices(vertex1, vertex2)) {
      this._edges[vertex1].push(new Edge(vertex1, vertex2, weight))
      this._edges[vertex2].push(new Edge(vertex2, vertex1, weight))
      this.edgeCount++
      return true
    } else {
      return false
    }
  }

  adj (vertex) {
    if (this.validVertices(vertex)) {
      return this._edges[vertex]
    } else {
      return null
    }
  }

  validVertices (...vertices) {
    return vertices.every(vertex => vertex < this.vertexCount && vertex >= 0)
  }

  get vertices () {
    return this._vertices
  }
}

module.exports = { EdgeWeightedGraph, Edge }
