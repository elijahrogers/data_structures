const Stack = require('../lib/stack')

test('Successfully intitializes', () => {
  const stack = new Stack()
  expect(stack).not.toBeUndefined()
})

describe('push', () => {
  test('adds new data to stack', () => {
    const stack = new Stack()
    stack.push(1)

    expect(stack.peek()).toEqual(1)
  })
})

describe('peek', () => {
  describe('when stack is empty', () => {
    test('returns null', () => {
      const stack = new Stack()

      expect(stack.peek()).toEqual(null)
    })
  })

  describe('when stack has data', () => {
    test('returns value of last item', () => {
      const stack = new Stack()
      stack.push(1)
      stack.push(2)

      expect(stack.peek()).toEqual(2)
    })

    test("doesn't remove last item", () => {
      const stack = new Stack()
      stack.push(1)
      stack.push(2)

      expect(stack.peek()).toEqual(2)
      expect(stack.peek()).toEqual(2)
    })
  })
})

describe('pop', () => {
  describe('when stack has data', () => {
    test('removes last item', () => {
      const stack = new Stack()
      stack.push(1)
      stack.pop()

      expect(stack.peek()).toEqual(null)
    })

    test('returns last item', () => {
      const stack = new Stack()
      stack.push(1)

      expect(stack.pop()).toEqual(1)
    })
  })

  describe('when stack is empty', () => {
    test('returns null', () => {
      const stack = new Stack()

      expect(stack.pop()).toEqual(null)
    })
  })
})
