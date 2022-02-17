const DirectedGraph = require('../../lib/graphs/directed_graph')

describe('#new', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      const graph = new DirectedGraph()

      expect(graph).not.toBeUndefined()
    })
  })

  describe('with an array of vertices', () => {
    test('successfully initializes', () => {
      const graph = new DirectedGraph([1, 2, 3])

      expect(graph).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
      const graph = new DirectedGraph([1, 2, 3])

      expect(graph.vertices).toEqual(3)
    })
  })
})

describe('#vertices', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      const graph = new DirectedGraph()

      expect(graph.vertices).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      expect(graph.vertices).toEqual(vertices.length)
    })
  })
})

describe('#edges', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      const graph = new DirectedGraph()

      expect(graph.edges).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      graph.addEdge(1, 2)
      graph.addEdge(1, 5)
      graph.addEdge(1, 3)

      expect(graph.edges).toEqual(3)
    })
  })

  describe('when graph has parallel edges', () => {
    test('correctly counts edges', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      graph.addEdge(1, 2)
      graph.addEdge(2, 1)

      expect(graph.edges).toEqual(2)
    })
  })

  describe('when graph has self-loops', () => {
    test('correctly counts edges', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      graph.addEdge(1, 1)

      expect(graph.edges).toEqual(1)
    })
  })
})

describe('#addEdge', () => {
  describe('with same vertices', () => {
    test('creates a self loop', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      graph.addEdge(1, 1)

      expect(graph.adj(1).value).toEqual(1)
    })

    test('returns true', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      expect(graph.addEdge(1, 1)).toEqual(true)
    })
  })

  describe('with different vertices', () => {
    test('adds a single directed edge', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      graph.addEdge(1, 2)

      expect(graph.adj(1).value).toEqual(2)
      expect(graph.adj(2)).toEqual([])
    })

    test('returns true', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      expect(graph.addEdge(1, 2)).toEqual(true)
    })
  })

  describe('with invalid vertices', () => {
    test('returns false', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      expect(graph.addEdge(99, 1)).toEqual(false)
    })

    test('does not add edge', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      graph.addEdge(99, 1)

      expect(graph.adj(1)).toEqual([])
    })
  })
})

describe('#adj', () => {
  describe('with an invalid vertex', () => {
    test('returns undefined', () => {
      const vertices = [1, 2, 3, 4, 5]
      const graph = new DirectedGraph(vertices)

      expect(graph.adj(99)).toBeUndefined()
    })
  })

  describe('with a valid vertex', () => {
    describe('when vertex has edges', () => {
      test('returns vertices from outgoing edges', () => {
        const vertices = [1, 2, 3, 4, 5]
        const graph = new DirectedGraph(vertices)

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
        const graph = new DirectedGraph(vertices)

        expect(graph.adj(1)).toEqual([])
      })
    })
  })
})

describe('#reverse', () => {
  describe('when graph is empty', () => {
    test('returns an empty graph', () => {
      const graph = new DirectedGraph()

      expect(graph.reverse()).toEqual(new DirectedGraph())
    })
  })

  describe('when graph has vertices and edges', () => {
    describe('returns a new directed graph', () => {
      let graph

      beforeAll(() => {
        graph = new DirectedGraph([1, 2, 3, 4])

        graph.addEdge(1, 2)
        graph.addEdge(1, 3)
        graph.addEdge(1, 4)
      })

      test('with the same number of vertices', () => {
        expect(graph.reverse().vertices).toEqual(graph.vertices)
      })

      test('with edges that point the opposite direction', () => {
        const reversed = graph.reverse()

        expect(reversed.edges).toEqual(3)
        expect(reversed.adj(2).value).toEqual(1)
        expect(reversed.adj(3).value).toEqual(1)
        expect(reversed.adj(4).value).toEqual(1)
      })
    })
  })
})
