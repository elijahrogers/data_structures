const { EdgeWeightedGraph, Edge } = require('../../lib/graphs/edge_weighted_graph')
let graph

describe('#initialize', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      expect(new EdgeWeightedGraph()).not.toBeUndefined()
    })
  })

  describe('with an array of contintuous vertices starting at 0', () => {
    beforeAll(() => { graph = new EdgeWeightedGraph([0, 1, 2]) })

    test('successfully initializes', () => {
      expect(graph).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
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
      expect(new EdgeWeightedGraph().vertexCount).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new EdgeWeightedGraph(vertices)

      expect(graph.vertexCount).toEqual(vertices.length)
    })
  })
})

describe('#edgeCount', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new EdgeWeightedGraph().edgeCount).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new EdgeWeightedGraph(vertices)

      graph.addEdge(1, 2)

      expect(graph.edgeCount).toEqual(1)
    })
  })
})

describe('#addEdge', () => {
  beforeEach(() => {
    graph = new EdgeWeightedGraph([0, 1, 2, 3, 4])
  })

  describe('with two valid vertices', () => {
    test('successfully adds an edge', () => {
      graph.addEdge(1, 2, 0.33)

      expect(graph.edgeCount).toEqual(1)
    })

    test('sets the correct edge weight', () => {
      graph.addEdge(1, 2, 0.33)

      expect(graph.adj(1)[0].weight).toEqual(0.33)
    })
  })

  describe('with two invalid vertices', () => {
    test('returns false', () => {
      expect(graph.addEdge(6, 5, 0.99)).toBeFalsy()
    })

    test('does not add edge', () => {
      graph.addEdge(6, 5, 0.99)

      expect(graph.edgeCount).toEqual(0)
    })
  })
})

describe('#vertices', () => {
  describe('when graph is empty', () => {
    test('returns an empty array', () => {
      expect(new EdgeWeightedGraph().vertices).toEqual([])
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new EdgeWeightedGraph(vertices)

      expect(graph.vertices).toEqual(vertices)
    })
  })
})

describe('#adj', () => {
  beforeEach(() => {
    graph = new EdgeWeightedGraph([0, 1, 2, 3, 4])
  })

  describe('with a valid vertex', () => {
    describe('that has no edges', () => {
      test('returns an empty list', () => {
        expect(graph.adj(1)).toEqual([])
      })
    })

    describe('that has edges', () => {
      test('returns an array of edges incident to the given vertex', () => {
        graph.addEdge(1, 2, 0.33)
        graph.addEdge(1, 3, 0.66)

        expect(graph.adj(1)).toBeInstanceOf(Array)
        expect(graph.adj(1)[0]).toBeInstanceOf(Edge)
      })
    })
  })

  describe('with an invalid vertex', () => {
    test('returns null', () => {
      expect(graph.adj(6)).toBeNull()
    })
  })
})
