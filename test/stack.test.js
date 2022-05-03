import Stack from '../lib/stack'
let stack

test('Successfully intitializes', () => {
  expect(new Stack()).not.toBeUndefined()
})

describe('push', () => {
  test('adds new data to stack', () => {
    stack = new Stack()
    stack.push(1)

    expect(stack.peek()).toEqual(1)
  })
})

describe('peek', () => {
  describe('when stack is empty', () => {
    test('returns null', () => {
      stack = new Stack()

      expect(stack.peek()).toEqual(null)
    })
  })

  describe('when stack has data', () => {
    beforeEach(() => {
      stack = new Stack()
      stack.push(1)
      stack.push(2)
    })

    test('returns value of last item', () => {
      expect(stack.peek()).toEqual(2)
    })

    test("doesn't remove last item", () => {
      expect(stack.peek()).toEqual(2)
      expect(stack.peek()).toEqual(2)
    })
  })
})

describe('pop', () => {
  describe('when stack has data', () => {
    beforeEach(() => {
      stack = new Stack()
      stack.push(1)
    })

    test('removes last item', () => {
      stack.pop()
      expect(stack.peek()).toEqual(null)
    })

    test('returns last item', () => {
      expect(stack.pop()).toEqual(1)
    })
  })

  describe('when stack is empty', () => {
    test('returns null', () => {
      expect(new Stack().pop()).toEqual(null)
    })
  })
})
