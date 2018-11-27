import PwdWindow from './PwdWindow'

export default class Memory extends PwdWindow {
  constructor (id, rows, cols) {
    super(id)
    this.rows = rows
    this.cols = cols
    this.title = 'Memory Game'
    this.iconUrl = '../image/cards-sprite.png'
    this.imageArray = this.getImageArray()
    this.displayWindow()
  }

  displayWindow () {
    super.displayWindow()
    for (let i = 0; i < this.rows * this.cols; i += 1) {
      let img = document.createElement('img')
      img.setAttribute('src', '../image/memory/0.png')
      img.setAttribute('class', 'MemoryImage')
      this.content.appendChild(img)

      if ((i + 1) % this.cols === 0) {
        this.content.appendChild(document.createElement('br'))
      }
    }
  }

  getImageArray () {
    let arr = []
    for (let i = 1; i <= (this.cols * this.rows) / 2; i++) {
      arr.push(i)
      arr.push(i)
    }
    arr = Memory.shuffleArray(arr)
    console.log(arr)
    return arr
  }

  /**
   * Returns a shuffled version of provided array
   * The "Fisher-Yates algorithm"
   * inspired by: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
   * @param {*} array - array to be shuffled
   */
  static shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a remaining element
      let randomIndex = Math.floor(Math.random() * i)
      // swap it with the current element
      let temporaryValue = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
}
