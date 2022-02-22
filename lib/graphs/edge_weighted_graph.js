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

class EdgeWeightedGraph {
  constructor (vertices = []) {
    this._vertices = vertices
    this.vertexCount = vertices.length
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
    return vertices.every(vertex => this._vertices.includes(vertex))
  }

  get vertices () {
    return this._vertices
  }
}

module.exports = { EdgeWeightedGraph, Edge }
