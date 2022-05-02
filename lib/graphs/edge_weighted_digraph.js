const PriorityQueue = require('../priority_queue')

class DirectedEdge {
  constructor (sourceVertex, destinationVertex, weight) {
    if (arguments.length < 3) {
      throw new Error('Not enough arguments')
    }
    this.sourceVertex = sourceVertex
    this.destinationVertex = destinationVertex
    this.weight = weight
  }

  from () {
    return this.sourceVertex
  }

  to () {
    return this.destinationVertex
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

class Paths {
  constructor (graph, sourceVertex) {
    this.graph = graph
    this.sourceVertex = sourceVertex
    this.queue = new PriorityQueue()
    this.edgeTo = Array(graph.vertices.length).fill(null)
    this.distanceTo = Array(graph.vertices.length).fill(Infinity)
  }

  to (vertex) {
    return Boolean(this.edgeTo[vertex])
  }

  dijkstra (vertex = this.sourceVertex) {
    this.queue.push(vertex, 0.0)
    this.distanceTo[vertex] = 0.0

    while (!this.queue.isEmpty) {
      this.relax(this.queue.pop())
    }

    return this
  }

  relax (vertex) {
    const adjacent = this.graph.adj(vertex)

    adjacent.forEach((adj) => {
      const destination = adj.to()

      if (this.distanceTo[destination] > this.distanceTo[vertex] + adj.weight) {
        this.distanceTo[destination] = this.distanceTo[vertex] + adj.weight
        this.edgeTo[destination] = vertex
        if (this.queue.contains(destination)) {
          this.queue.changeKey(this.distanceTo[destination], destination)
        } else {
          this.queue.push(destination, this.distanceTo[destination])
        }
      }
    })
  }
}

class ShortestPaths extends Paths {
  to (destination) {
    const path = []

    if (this.distanceTo[destination] !== Infinity) {
      for (let vert = destination; vert !== null; vert = this.edgeTo[vert]) {
        path.push(vert)
      }
    }

    return path.reverse()
  }
}

class Distances extends Paths {
  to (destination) {
    return this.distanceTo[destination]
  }
}

// Performance (worst case)
//
// Insert: O(1)
// Delete: N/A
// Lookup: O(n)
//

class EdgeWeightedDigraph {
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
      this._edges[vertex1].push(new DirectedEdge(vertex1, vertex2, weight))
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
      return []
    }
  }

  hasPathFrom (sourceVertex) {
    return new Paths(this, sourceVertex).dijkstra()
  }

  shortestPathFrom (sourceVertex) {
    return new ShortestPaths(this, sourceVertex).dijkstra()
  }

  distanceFrom (sourceVertex) {
    return new Distances(this, sourceVertex).dijkstra()
  }

  validVertices (...vertices) {
    if (vertices.length === 0) {
      return true
    } else {
      return vertices.every(vertex => vertex < this.vertexCount && vertex >= 0)
    }
  }

  get vertices () {
    return this._vertices
  }

  get edges () {
    return this.edgeCount
  }
}

module.exports = { EdgeWeightedDigraph, DirectedEdge }
