const { EdgeWeightedDigraph, DirectedEdge } = require('../../lib/graphs/edge_weighted_digraph')
let graph

describe('#initialize', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      expect(new EdgeWeightedDigraph()).not.toBeUndefined()
    })
  })

  describe('with an array of contintuous vertices starting at 0', () => {
    beforeAll(() => { graph = new EdgeWeightedDigraph([0, 1, 2]) })

    test('successfully initializes', () => {
      expect(graph).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
      expect(graph.vertexCount).toEqual(3)
    })
  })

  describe('with an array of non-continous vertices', () => {
    test('throws an error', () => {
      expect(() => new EdgeWeightedDigraph([0, 1, 3])).toThrow('Invalid vertices')
    })
  })

  describe('with an array of vertices starting after 0', () => {
    test('throws an error', () => {
      expect(() => new EdgeWeightedDigraph([1, 2, 3])).toThrow('Invalid vertices')
    })
  })
})

describe('#vertexCount', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new EdgeWeightedDigraph().vertexCount).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new EdgeWeightedDigraph(vertices)

      expect(graph.vertexCount).toEqual(vertices.length)
    })
  })
})

describe('#edgeCount', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new EdgeWeightedDigraph().edgeCount).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      graph = new EdgeWeightedDigraph([0, 1, 2, 3, 4])

      graph.addEdge(1, 2, 0.5)

      expect(graph.edgeCount).toEqual(1)
    })
  })
})

describe('#addEdge', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new EdgeWeightedDigraph(vertices)
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
      expect(new EdgeWeightedDigraph().vertices).toEqual([])
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new EdgeWeightedDigraph(vertices)

      expect(graph.vertices).toEqual(vertices)
    })
  })
})

describe('#adj', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new EdgeWeightedDigraph(vertices)
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
        expect(graph.adj(1)[0]).toBeInstanceOf(DirectedEdge)
      })
    })
  })

  describe('with an invalid vertex', () => {
    test('returns empty array', () => {
      expect(graph.adj(6)).toEqual([])
    })
  })
})

describe('#hasPathFrom', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new EdgeWeightedDigraph(vertices)
  })

  describe('when a path exists', () => {
    test('returns true', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(1, 3, 0.66)

      expect(graph.hasPathFrom(1).to(3)).toBeTruthy()
    })
  })

  describe('when multiple paths exist', () => {
    test('returns true', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(1, 3, 0.12)
      graph.addEdge(2, 3, 0.50)

      expect(graph.hasPathFrom(1).to(3)).toBeTruthy()
    })
  })

  describe('when no path exists', () => {
    test('returns false', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(1, 3, 0.66)

      expect(graph.hasPathFrom(1).to(4)).toBeFalsy()
    })
  })
})

describe('#distanceFrom', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new EdgeWeightedDigraph(vertices)
  })

  describe('#when a path between the vertices exists', () => {
    test('returns the sum of edge weigts along the path', () => {
      graph.addEdge(2, 1, 0.33)
      graph.addEdge(3, 1, 0.45)

      expect(graph.distanceFrom(3).to(1)).toEqual(0.45)
    })
  })

  describe('#when multiple paths between the vertices exist', () => {
    test('returns the sum of edge weigts along the shortest path', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(2, 3, 0.11)
      graph.addEdge(1, 3, 0.45)

      expect(graph.distanceFrom(1).to(3)).toEqual(0.44)
    })
  })

  describe('#when no path between the vertice s exists', () => {
    test('returns positive infinity', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(2, 3, 0.11)
      graph.addEdge(1, 3, 0.45)

      expect(graph.distanceFrom(4).to(1)).toEqual(Infinity)
    })
  })
})

describe('#shortestPathFrom', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new EdgeWeightedDigraph(vertices)
  })

  describe('#when a path between the vertices exists', () => {
    test('returns the path as an array of vertices', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(2, 4, 0.45)

      expect(graph.shortestPathFrom(1).to(4)).toEqual([1, 2, 4])
    })
  })

  describe('#when multiple paths between the vertices exist', () => {
    test('returns the shortest path', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(2, 3, 0.11)
      graph.addEdge(1, 3, 0.45)

      expect(graph.shortestPathFrom(1).to(3)).toEqual([1, 2, 3])
    })
  })

  describe('#when no path between the vertices exists', () => {
    test('returns an empty array', () => {
      graph.addEdge(1, 2, 0.33)
      graph.addEdge(2, 3, 0.11)
      graph.addEdge(1, 3, 0.45)

      expect(graph.shortestPathFrom(4).to(1)).toEqual([])
    })
  })
})
