import PwdWindow from './PwdWindow'

export default class Memory extends PwdWindow {
  constructor (id, rows, cols) {
    super(id)
    this.rows = rows
    this.cols = cols
    this.title = 'Memory Game'
    this.iconUrl = '../image/cards-sprite.png'
    this.imageArray = this.getImageArray()
    this.flipOne = undefined
    this.flipTwo = undefined
    this.mouseDown = function (e) {
      e.preventDefault()
      console.log(e.target)
      if (e.target.classList.contains('MemoryImage')) {
        this.flipCard(e.target.getAttribute('card-number'), e.target.getAttribute('index'), e.target)
      }
    }.bind(this)
    this.displayWindow()
  }

  displayWindow () {
    super.displayWindow()

    let template = document.querySelectorAll('#memory')[0].content.firstElementChild
    this.imageArray.forEach((element, index) => {
      let img = document.importNode(template, true)
      this.content.appendChild(img)
      img.firstElementChild.setAttribute('card-number', element)
      img.firstElementChild.setAttribute('index', index)
      if ((index + 1) % this.cols === 0) {
        this.content.appendChild(document.createElement('br'))
      }
    })
    this.content.addEventListener('mousedown', this.mouseDown)
  }
  deleteWindow () {
    this.content.removeEventListener('mousedown', this.mouseDown)
    super.deleteWindow()
  }

  getImageArray () {
    let arr = []
    for (let i = 1; i <= (this.cols * this.rows) / 2; i++) {
      arr.push(i)
      arr.push(i)
    }
    arr = Memory.shuffleArray(arr)
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
  flipCard (element, index, target) {
    if (target.nodeName !== 'IMG') {
      target = target.firstElementChild
    }
    let object = { element, index, target }
    let unknownSrc = '../image/memory/0.png'
    if (!this.flipOne || !this.flipTwo) {
      console.log(target.src.parentElement)
      target.setAttribute('src', '../image/memory/' + element + '.png')
      if (!this.flipOne) {
        this.flipOne = object
      } else if (this.flipOne.index !== object.index) {
        this.flipTwo = object
        if (this.flipOne.element === this.flipTwo.element) {
          window.setTimeout(() => {
            console.log('yay')
            this.flipOne.target.parentNode.classList.add('Removed')
            this.flipTwo.target.parentNode.classList.add('Removed')
          }, 500)
        }
        window.setTimeout(() => {
          this.flipOne.target.src = unknownSrc
          this.flipTwo.target.src = unknownSrc
          this.flipOne = undefined
          this.flipTwo = undefined
        }, 500)
      }
    }
  }
}
