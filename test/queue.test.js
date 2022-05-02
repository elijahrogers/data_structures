const Queue = require('../lib/queue')
let queue

test('Successfully intitializes', () => {
  expect(new Queue()).not.toBeUndefined()
})

describe('enqueue', () => {
  test('adds item to queue', () => {
    const queue = new Queue()
    queue.enqueue('Hello')

    expect(queue.front()).toEqual('Hello')
  })
})

describe('dequeue', () => {
  describe('when queue is empty', () => {
    test('returns null', () => {
      const queue = new Queue()

      expect(queue.dequeue()).toBeNull()
    })
  })

  describe('when queue has items', () => {
    beforeEach(() => {
      queue = new Queue()
      queue.enqueue('First')
      queue.enqueue('Second')
    })

    test('returns first item from the queue', () => {
      expect(queue.dequeue()).toEqual('First')
    })

    test('removes first item from the queue', () => {
      queue.dequeue()

      expect(queue.front()).toEqual('Second')
    })
  })
})

describe('front', () => {
  describe('when queue is empty', () => {
    test('returns null', () => {
      const queue = new Queue()

      expect(queue.front()).toBeNull()
    })
  })

  describe('when queue has items', () => {
    test('returns the first item enqueued', () => {
      const queue = new Queue()
      queue.enqueue('First')
      queue.enqueue('Second')

      expect(queue.front()).toEqual('First')
    })
  })
})

describe('back', () => {
  describe('when queue is empty', () => {
    test('returns null', () => {
      const queue = new Queue()

      expect(queue.back()).toBeNull()
    })
  })

  describe('when queue has items', () => {
    test('returns last item queued', () => {
      const queue = new Queue()
      queue.enqueue('First')
      queue.enqueue('Second')

      expect(queue.back()).toEqual('Second')
    })
  })
})

describe('isEmpty', () => {
  describe('when queue has no items', () => {
    test('returns true', () => {
      const queue = new Queue()

      expect(queue.isEmpty).toEqual(true)
    })
  })

  describe('when queue has items', () => {
    test('returns false', () => {
      const queue = new Queue()
      queue.enqueue('A single item')

      expect(queue.isEmpty).toEqual(false)
    })
  })
})
