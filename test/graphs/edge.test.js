import { Edge } from '../../lib/graphs/edge_weighted_graph'
let edge

describe('#initialize', () => {
  beforeAll(() => { edge = new Edge(1, 2, 0.77) })

  describe('with any vertices and some weight', () => {
    test('successfully initializes', () => {
      expect(edge).not.toBeUndefined()
    })

    test('set the correct weight', () => {
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
    edge = new Edge(1, 2, 0.77)

    expect([1, 2]).toContain(edge.either())
  })
})

describe('#other', () => {
  beforeAll(() => { edge = new Edge(1, 2, 0.77) })

  describe('given an invalid vertex', () => {
    test('returns null', () => {
      expect(edge.other(3)).toBeNull()
    })
  })

  describe('given a valid vertex', () => {
    test('returns the vertex not passed', () => {
      expect(edge.other(1)).toEqual(2)
      expect(edge.other(2)).toEqual(1)
    })
  })
})

describe('#compareTo', () => {
  let bigger, smaller

  beforeAll(() => {
    edge = new Edge(1, 2, 0.77)
    bigger = new Edge(1, 2, 0.88)
    smaller = new Edge(1, 3, 0.66)
  })

  describe('when edges have the same weight', () => {
    test('returns 0', () => {
      expect(edge.compareTo(edge)).toEqual(0)
    })
  })

  describe('when the first edge has a larger weight', () => {
    test('returns 1', () => {
      expect(bigger.compareTo(smaller)).toEqual(1)
    })
  })

  describe('when the second edge has a larger weight', () => {
    test('returns -1', () => {
      expect(smaller.compareTo(bigger)).toEqual(-1)
    })
  })
})
