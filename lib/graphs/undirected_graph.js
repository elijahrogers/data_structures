const SinglyLinkedList = require('../lists/singly_linked_list')

class UndirectedGraph {
  constructor (vertices = []) {
    this._vertices = vertices
    this._edges = {}
    this.edgeCount = 0
    this.vertexCount = vertices.length
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

    if (vert && vert.head) {
      return vert.getNode(0)
    } else if (vert) {
      return []
    }
  }

  validVertices (...vertices) {
    return vertices.every(vertex => this._vertices.includes(vertex))
  }

  get vertices () {
    return this.vertexCount
  }

  get edges () {
    return this.edgeCount
  }
}

module.exports = UndirectedGraph
