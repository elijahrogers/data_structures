const { Edge } = require('../../lib/graphs/edge_weighted_graph')

describe('#initialize', () => {
  describe('with any vertices and some weight', () => {
    test('successfully initializes', () => {
      const edge = new Edge(1, 2, 0.77)

      expect(edge).not.toBeUndefined()
    })

    test('set the correct weight', () => {
      const edge = new Edge(1, 2, 0.77)

      expect(edge.weight).toEqual(0.77)
    })
  })

  describe('without a weight', () => {
    test('throws an error', () => {
      expect(() => new Edge(1, 2)).toThrow('Not enough arguments')
    })
  })
})

describe('#either', () => {
  test('returns a vertex', () => {
    const edge = new Edge(1, 2, 0.77)

    expect([1, 2]).toContain(edge.either())
  })
})

describe('#other', () => {
  describe('given an invalid vertex', () => {
    test('returns null', () => {
      const edge = new Edge(1, 2, 0.77)

      expect(edge.other(3)).toBeNull()
    })
  })

  describe('given a valid vertex', () => {
    test('returns the vertex not passed', () => {
      const edge = new Edge(1, 2, 0.77)

      expect(edge.other(1)).toEqual(2)
      expect(edge.other(2)).toEqual(1)
    })
  })
})

describe('#compareTo', () => {
  describe('when edges have the same weight', () => {
    test('returns 0', () => {
      const edge = new Edge(1, 2, 0.77)
      const other = new Edge(1, 2, 0.77)

      expect(edge.compareTo(other)).toEqual(0)
    })
  })

  describe('when the first edge has a larger weight', () => {
    test('returns 1', () => {
      const edge = new Edge(1, 2, 0.88)
      const other = new Edge(2, 3, 0.77)

      expect(edge.compareTo(other)).toEqual(1)
    })
  })

  describe('when the second edge has a larger weight', () => {
    test('returns -1', () => {
      const edge = new Edge(1, 2, 0.77)
      const other = new Edge(2, 3, 0.88)

      expect(edge.compareTo(other)).toEqual(-1)
    })
  })
})
