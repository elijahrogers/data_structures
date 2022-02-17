const SinglyLinkedList = require('../lists/singly_linked_list')

class DirectedGraph {
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
    return vertices.every(vertex => this._vertices.includes(vertex))
  }

  get vertices () {
    return this.vertexCount
  }

  get edges () {
    return this.edgeCount
  }
}

module.exports = DirectedGraph
