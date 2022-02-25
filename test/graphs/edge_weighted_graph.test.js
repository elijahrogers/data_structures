const { EdgeWeightedGraph, Edge } = require('../../lib/graphs/edge_weighted_graph')

describe('#initialize', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      const graph = new EdgeWeightedGraph()

      expect(graph).not.toBeUndefined()
    })
  })

  describe('with an array of contintuous vertices starting at 0', () => {
    test('successfully initializes', () => {
      const graph = new EdgeWeightedGraph([0, 1, 2, 3])

      expect(graph).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
      const graph = new EdgeWeightedGraph([0, 1, 2])

      expect(graph.vertexCount).toEqual(3)
    })
  })

  describe('with an array of non-continous vertices', () => {
    test('throws an error', () => {
      expect(() => new EdgeWeightedGraph([0, 1, 3])).toThrow('Invalid vertices')
    })
  })


  describe('with an array of vertices starting after 0', () => {
    test('throws an error', () => {
      expect(() => new EdgeWeightedGraph([1, 2, 3])).toThrow('Invalid vertices')
    })
  })
})

describe('#vertexCount', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      const graph = new EdgeWeightedGraph()

      expect(graph.vertexCount).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      const graph = new EdgeWeightedGraph(vertices)

      expect(graph.vertexCount).toEqual(vertices.length)
    })
  })
})

describe('#edgeCount', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      const graph = new EdgeWeightedGraph()

      expect(graph.edgeCount).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      const vertices = [0, 1, 2, 3, 4]
      const graph = new EdgeWeightedGraph(vertices)

      graph.addEdge(1, 2)

      expect(graph.edgeCount).toEqual(1)
    })
  })
})

describe('#addEdge', () => {
  describe('with two valid vertices', () => {
    test('successfully adds an edge', () => {
      const vertices = [0, 1, 2, 3, 4]
      const graph = new EdgeWeightedGraph(vertices)

      graph.addEdge(1, 2, 0.33)

      expect(graph.edgeCount).toEqual(1)
    })

    test('sets the correct edge weight', () => {
      const vertices = [0, 1, 2, 3, 4]
      const graph = new EdgeWeightedGraph(vertices)

      graph.addEdge(1, 2, 0.33)

      expect(graph.adj(1)[0].weight).toEqual(0.33)
    })
  })

  describe('with two invalid vertices', () => {
    test('returns false', () => {
      const graph = new EdgeWeightedGraph([0, 1, 2, 3])

      expect(graph.addEdge(4, 5, 0.99)).toBeFalsy()
    })

    test('does not add edge', () => {
      const graph = new EdgeWeightedGraph([0, 1, 2, 3])

      graph.addEdge(4, 5, 0.99)

      expect(graph.edgeCount).toEqual(0)
    })
  })
})

describe('#vertices', () => {
  describe('when graph is empty', () => {
    test('returns an empty array', () => {
      const graph = new EdgeWeightedGraph()

      expect(graph.vertices).toEqual([])
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      const graph = new EdgeWeightedGraph(vertices)

      expect(graph.vertices).toEqual(vertices)
    })
  })
})

describe('#adj', () => {
  describe('with a valid vertex', () => {
    describe('that has no edges', () => {
      test('returns an empty list', () => {
        const vertices = [0, 1, 2, 3, 4]
        const graph = new EdgeWeightedGraph(vertices)

        expect(graph.adj(1)).toEqual([])
      })
    })

    describe('that has edges', () => {
      test('returns an array of edges incident to the given vertex', () => {
        const vertices = [0, 1, 2, 3, 4]
        const graph = new EdgeWeightedGraph(vertices)

        graph.addEdge(1, 2, 0.33)
        graph.addEdge(1, 3, 0.66)

        expect(graph.adj(1)).toBeInstanceOf(Array)
        expect(graph.adj(1)[0]).toBeInstanceOf(Edge)
      })
    })
  })

  describe('with an invalid vertex', () => {
    test('returns null', () => {
      const vertices = [0, 1, 2, 3, 4]
      const graph = new EdgeWeightedGraph(vertices)

      expect(graph.adj(6)).toBeNull()
    })
  })
})
