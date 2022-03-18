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

  exchange (array, indx1, indx2) {
    const temp = array[indx1]
    array[indx1] = array[indx2]
    array[indx2] = temp
  }

  lessThanPrev (array, i) {
    return this.val(array[i]) < this.val(array[i - 1])
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
}

module.exports = SortableArray