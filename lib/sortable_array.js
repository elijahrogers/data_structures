class SortableArray {
  constructor (array = []) {
    this.values = array
  }

  insertionSort () {
    let sorted = this.values

    for (let i = 0; i < sorted.length; i++) {
      for (let j = i; j > 0 && this.lessThanPrev(sorted, j); j--) {
        this.exchange(sorted, j, j - 1)
      }
    }

    return sorted
  }

  bubbleSort () {
    let sorted = this.values
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
    let temp = array.slice()
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

  exchange (array, indx1, indx2) {
    const temp = array[indx1]
    array[indx1] = array[indx2]
    array[indx2] = temp
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