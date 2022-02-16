const UndirectedGraph = require('../../lib/graphs/undirected_graph')

describe('#new', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      const graph = new UndirectedGraph()

      expect(graph).not.toBeUndefined()
    })
  })

  describe('with an array of vertices', () => {
    test('successfully initializes', () => {
      const graph = new UndirectedGraph([1, 2, 3])

      expect(graph).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
      const graph = new UndirectedGraph([1, 2, 3])

      expect(graph.vertices).toEqual(3)
    })
  })
})

describe('#vertices', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      const graph = new UndirectedGraph()

      expect(graph.vertices).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      expect(graph.vertices).toEqual(vertices.length)
    })
  })
})

describe('#edges', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      const graph = new UndirectedGraph()

      expect(graph.edges).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      graph.addEdge(1, 2)
      graph.addEdge(1, 5)
      graph.addEdge(1, 3)

      expect(graph.edges).toEqual(3)
    })
  })

  describe('when graph has parallel edges', () => {
    test('correctly counts edges', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      graph.addEdge(1, 2)
      graph.addEdge(2, 1)

      expect(graph.edges).toEqual(2)
    })
  })

  describe('when graph has self-loops', () => {
    test('correctly counts edges', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      graph.addEdge(1, 1)

      expect(graph.edges).toEqual(1)
    })
  })
})

describe('#addEdge', () => {
  describe('with same vertices', () => {
    test('creates a self loop', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      graph.addEdge(1, 1)

      expect(graph.adj(1).value).toEqual(1)
    })

    test('returns true', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      expect(graph.addEdge(1, 1)).toEqual(true)
    })
  })

  describe('with different vertices', () => {
    test('adds edge on both vertices', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      graph.addEdge(1, 2)

      expect(graph.adj(1).value).toEqual(2)
      expect(graph.adj(2).value).toEqual(1)
    })

    test('returns true', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      expect(graph.addEdge(1, 2)).toEqual(true)
    })
  })

  describe('with invalid vertices', () => {
    test('returns false', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      expect(graph.addEdge(99, 1)).toEqual(false)
    })

    test('does not add edge', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      graph.addEdge(99, 1)

      expect(graph.adj(1)).toEqual([])
    })
  })
})

describe('#adj', () => {
  describe('with an invalid vertex', () => {
    test('returns undefined', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new UndirectedGraph(vertices)

      expect(graph.adj(99)).toBeUndefined()
    })
  })

  describe('with a valid vertex', () => {
    describe('when vertex has edges', () => {
      test('returns all adjacent edges', () => {
        const vertices = [1, 2, 3, 4, 5]
        const graph = new UndirectedGraph(vertices)

        graph.addEdge(1, 2)
        graph.addEdge(1, 5)
        graph.addEdge(1, 3)

        expect(graph.adj(1).value).toEqual(2)
        expect(graph.adj(1).next.value).toEqual(5)
        expect(graph.adj(1).next.next.value).toEqual(3)
      })
    })

    describe('when vertex does not have edges', () => {
      test('returns an empty array', () => {
        const vertices = [1, 2, 3, 4, 5]
        const graph = new UndirectedGraph(vertices)

        expect(graph.adj(1)).toEqual([])
      })
    })
  })
})
