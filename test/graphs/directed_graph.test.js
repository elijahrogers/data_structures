import DirectedGraph from '../../lib/graphs/directed_graph'
let graph

describe('#new', () => {
  describe('with no arguments', () => {
    test('successfully initializes', () => {
      expect(new DirectedGraph()).not.toBeUndefined()
    })
  })

  describe('with an array of contintuous vertices starting at 0', () => {
    beforeAll(() => { graph = new DirectedGraph([0, 1, 2]) })

    test('successfully initializes', () => {
      expect(graph).not.toBeUndefined()
    })

    test('sets the given vertices', () => {
      expect(graph.vertices).toEqual(3)
    })
  })

  describe('with an array of non-continous vertices', () => {
    test('throws an error', () => {
      expect(() => new DirectedGraph([0, 1, 3])).toThrow('Invalid vertices')
    })
  })

  describe('with an array of vertices starting after 0', () => {
    test('throws an error', () => {
      expect(() => new DirectedGraph([1, 2, 3])).toThrow('Invalid vertices')
    })
  })
})

describe('#vertices', () => {
  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new DirectedGraph().vertices).toEqual(0)
    })
  })

  describe('when graph has vertices', () => {
    test('returns the correct number of vertices', () => {
      const vertices = [0, 1, 2, 3, 4]
      graph = new DirectedGraph(vertices)

      expect(graph.vertices).toEqual(vertices.length)
    })
  })
})

describe('#edges', () => {
  beforeEach(() => {
    const vertices = [0, 1, 2, 3, 4]
    graph = new DirectedGraph(vertices)
  })

  describe('when graph is empty', () => {
    test('returns 0', () => {
      expect(new DirectedGraph().edges).toEqual(0)
    })
  })

  describe('when graph has edges', () => {
    test('returns correct amount', () => {
      graph.addEdge(0, 1)
      graph.addEdge(0, 4)
      graph.addEdge(0, 2)

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
    graph = new DirectedGraph(vertices)
  })

  describe('with same vertices', () => {
    test('creates a self loop', () => {
      graph.addEdge(1, 1)

      expect(graph.adj(1).value).toEqual(1)
    })

    test('returns true', () => {
      expect(graph.addEdge(1, 1)).toEqual(true)
    })
  })

  describe('with different vertices', () => {
    test('adds a single directed edge', () => {
      graph.addEdge(1, 2)

      expect(graph.adj(1).value).toEqual(2)
      expect(graph.adj(2)).toEqual([])
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
    graph = new DirectedGraph(vertices)
  })

  describe('with an invalid vertex', () => {
    test('returns undefined', () => {
      expect(graph.adj(99)).toBeUndefined()
    })
  })

  describe('with a valid vertex', () => {
    describe('when vertex has edges', () => {
      test('returns vertices from outgoing edges', () => {
        graph.addEdge(0, 2)
        graph.addEdge(0, 4)
        graph.addEdge(0, 3)

        expect(graph.adj(0).value).toEqual(2)
        expect(graph.adj(0).next.value).toEqual(4)
        expect(graph.adj(0).next.next.value).toEqual(3)
      })
    })

    describe('when vertex does not have edges', () => {
      test('returns an empty array', () => {
        expect(graph.adj(1)).toEqual([])
      })
    })
  })
})

describe('#reverse', () => {
  describe('when graph is empty', () => {
    test('returns an empty graph', () => {
      expect(new DirectedGraph().reverse()).toEqual(new DirectedGraph())
    })
  })

  describe('when graph has vertices and edges', () => {
    describe('returns a new directed graph', () => {
      beforeAll(() => {
        graph = new DirectedGraph([0, 1, 2, 3, 4])

        graph.addEdge(0, 2)
        graph.addEdge(0, 3)
        graph.addEdge(0, 4)
      })

      test('with the same number of vertices', () => {
        expect(graph.reverse().vertices).toEqual(graph.vertices)
      })

      test('with edges that point the opposite direction', () => {
        const reversed = graph.reverse()

        expect(reversed.edges).toEqual(3)
        expect(reversed.adj(2).value).toEqual(0)
        expect(reversed.adj(3).value).toEqual(0)
        expect(reversed.adj(4).value).toEqual(0)
      })
    })
  })
})
