import UndirectedGraph from '../../lib/graphs/undirected_graph'
let graph

describe('#new', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      expect(new UndirectedGraph()).not.toBeUndefined()
    })
  })

  describe('with an array of contintuous vertices starting at 0', () => {
    test('successfully initializes', () => {
      expect(new UndirectedGraph([0, 1, 2, 3])).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
      expect(new UndirectedGraph([0, 1, 2, 3]).vertices).toEqual(4)
    })
  })

  describe('with an array of non-continous vertices', () => {
    test('throws an error', () => {
      expect(() => new UndirectedGraph([0, 1, 3])).toThrow('Invalid vertices')
    })
  })

  describe('with an array of vertices starting after 0', () => {
    test('throws an error', () => {
      expect(() => new UndirectedGraph([1, 2, 3])).toThrow('Invalid vertices')
    })
  })
})

describe('#vertices', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new UndirectedGraph().vertices).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new UndirectedGraph(vertices)

      expect(graph.vertices).toEqual(vertices.length)
    })
  })
})

describe('#edges', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new UndirectedGraph(vertices)
  })

  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new UndirectedGraph().edges).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      graph.addEdge(1, 2)
      graph.addEdge(1, 4)
      graph.addEdge(1, 3)

      expect(graph.edges).toEqual(3)
    })
  })

  describe('when graph has parallel edges', () => {
    test('correctly counts edges', () => {
      graph.addEdge(1, 2)
      graph.addEdge(2, 1)

      expect(graph.edges).toEqual(2)
    })
  })

  describe('when graph has self-loops', () => {
    test('correctly counts edges', () => {
      graph.addEdge(1, 1)

      expect(graph.edges).toEqual(1)
    })
  })
})

describe('#addEdge', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new UndirectedGraph(vertices)
  })

  describe('with same vertices', () => {
    test('creates a self loop', () => {
      graph.addEdge(1, 1)

      expect(graph.adj(1)[0]).toEqual(1)
    })

    test('returns true', () => {
      expect(graph.addEdge(1, 1)).toEqual(true)
    })
  })

  describe('with different vertices', () => {
    test('adds edge on both vertices', () => {
      graph.addEdge(1, 2)

      expect(graph.adj(1)[0]).toEqual(2)
      expect(graph.adj(2)[0]).toEqual(1)
    })

    test('returns true', () => {
      expect(graph.addEdge(1, 2)).toEqual(true)
    })
  })

  describe('with invalid vertices', () => {
    test('returns false', () => {
      expect(graph.addEdge(99, 1)).toEqual(false)
    })

    test('does not add edge', () => {
      graph.addEdge(99, 1)

      expect(graph.adj(1)).toEqual([])
    })
  })
})

describe('#adj', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new UndirectedGraph(vertices)
  })

  describe('with an invalid vertex', () => {
    test('returns undefined', () => {
      expect(graph.adj(99)).toBeUndefined()
    })
  })

  describe('with a valid vertex', () => {
    describe('when vertex has edges', () => {
      test('returns an array of all adjacent edges', () => {
        graph.addEdge(1, 2)
        graph.addEdge(1, 4)
        graph.addEdge(1, 3)

        expect(graph.adj(1)).toEqual([2, 4, 3])
      })
    })

    describe('when vertex does not have edges', () => {
      test('returns an empty arry', () => {
        expect(graph.adj(1)).toEqual([])
      })
    })
  })
})

describe('#hasPathTo', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new UndirectedGraph(vertices)
  })

  describe('when no path to the given vertex exists', () => {
    test('returns false', () => {
      graph.addEdge(1, 2)
      graph.addEdge(1, 4)
      graph.addEdge(1, 3)

      expect(graph.hasPathFrom(0).to(2)).toEqual(false)
    })
  })

  describe('when a path to the given vertex exists', () => {
    test('returns true', () => {
      graph.addEdge(0, 1)
      graph.addEdge(1, 2)
      graph.addEdge(1, 4)

      expect(graph.hasPathFrom(4).to(2)).toEqual(true)
    })
  })
})

describe('#shortestPathFrom', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new UndirectedGraph(vertices)
  })

  describe('when source has no adjacent edges', () => {
    test('returns an empty array', () => {
      graph.addEdge(1, 2)
      graph.addEdge(1, 4)
      graph.addEdge(1, 3)

      expect(graph.shortestPathFrom(0).to(2)).toEqual([])
    })
  })

  describe('when a single path to the given vertex exists', () => {
    test('returns the path as an array of edges', () => {
      graph.addEdge(0, 1)
      graph.addEdge(1, 2)
      graph.addEdge(1, 4)

      expect(graph.shortestPathFrom(0).to(2)).toEqual([0, 1, 2])
    })
  })

  describe('when multiple paths to the given vertex exist', () => {
    test('returns the one with the fewest edges', () => {
      graph.addEdge(0, 1)
      graph.addEdge(1, 2)
      graph.addEdge(1, 4)
      graph.addEdge(0, 2)

      expect(graph.shortestPathFrom(0).to(2)).toEqual([0, 2])
    })
  })
})
