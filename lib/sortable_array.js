class SortableArray {
  constructor (array = []) {
    this.values = array
  }

  insertionSort () {
    const sorted = this.values

    for (let i = 0; i < sorted.length; i++) {
      for (let j = i; j > 0 && this.lessThanPrev(sorted, j); j--) {
        this.exchange(sorted, j, j - 1)
      }
    }

    return sorted
  }

  bubbleSort () {
    const sorted = this.values
    let swapped = true

    while (swapped) {
      swapped = false

      for (let i = 0; i < sorted.length - 1; i++) {
        if (this.moreThanNext(sorted, i)) {
          this.exchange(sorted, i, i + 1)
          swapped = true
        }
      }
    }

    return sorted
  }

  mergeSort (array = this.values.slice(), lo = 0, hi = this.length - 1) {
    if (this.length === 0) {
      return []
    } else if (hi <= lo || hi < 0) {
      return array
    } else {
      const mid = Math.floor(lo + (hi - lo) / 2)
      this.mergeSort(array, lo, mid)
      this.mergeSort(array, mid + 1, hi)
      this.merge(array, lo, mid, hi)
    }

    return array
  }

  merge (array, lo, mid, hi) {
    const temp = array.slice()
    let left = lo
    let right = mid + 1

    for (let index = lo; index <= hi; index++) {
      if (left > mid) {
        array[index] = temp[right++]
      } else if (right > hi) {
        array[index] = temp[left++]
      } else if (this.compare(temp, left, right)) {
        array[index] = temp[right++]
      } else {
        array[index] = temp[left++]
      }
    }
  }

  quickSort () {
    const sorted = this.shuffle(this.values.slice())

    this.partitionAndSort(sorted, 0, this.length - 1)

    return sorted
  }

  partitionAndSort (array, lo, hi) {
    if (lo >= hi) {
      return
    }

    const partition = this.partition(array, lo, hi)
    this.partitionAndSort(array, lo, partition - 1)
    this.partitionAndSort(array, partition + 1, hi)
  }

  partition (array, lo, hi) {
    const partition = lo
    let left = lo
    let right = hi + 1

    while (true) {
      do { left++ } while (this.gte(array, partition, left) && left !== hi)
      do { right-- } while (this.gte(array, right, partition) && right !== lo)

      if (left >= right) {
        break
      }

      this.exchange(array, left, right)
    }

    this.exchange(array, partition, right)
    return right
  }

  heapSort () {
    const sorted = this.values.slice()
    const length = sorted.length

    for (let i = Math.floor(length / 2); i >= 0; i--) {
      this.sink(sorted, i, length)
    }

    let n = length - 1

    while (n > 1) {
      this.exchange(sorted, 0, n--)
      this.sink(sorted, 0, n)
    }

    return sorted
  }

  sink (array, index, length) {
    while ((2 * index) + 1 < length) {
      let childIdx = (2 * index) + 1
      if (childIdx < length && this.compare(array, childIdx + 1, childIdx)) {
        childIdx++
      }
      if (this.compare(array, index, childIdx)) {
        break
      }
      this.exchange(array, index, childIdx)
      index = childIdx
    }
  }

  shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndx = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[randomIndx]
      array[randomIndx] = temp
    }

    return array
  }

  exchange (array, indx1, indx2) {
    const temp = array[indx1]
    array[indx1] = array[indx2]
    array[indx2] = temp
  }

  gte (array, a, b) {
    return this.val(array[a]) >= this.val(array[b])
  }

  compare (array, a, b) {
    return this.val(array[a]) > this.val(array[b])
  }

  lessThanPrev (array, i) {
    return this.val(array[i]) < this.val(array[i - 1])
  }

  moreThanNext (array, i) {
    return this.val(array[i]) > this.val(array[i + 1])
  }

  val (data) {
    let val = 0

    switch (typeof data) {
      case 'string':
        for (let i = 0; i < data.length; i++) {
          val += data.charCodeAt(i)
        }
        break
      default:
        val = data
    }

    return val
  }

  get length () {
    return this.values.length
  }
}

module.exports = SortableArray
