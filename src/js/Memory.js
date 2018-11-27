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
    this.pairs = 0
    this.click = function (e) {
      console.log(e.target.nodeName)
      let target = e.target
      if (target.nodeName === 'A') {
        target = target.firstElementChild
      }
      if (target.classList.contains('MemoryImage')) {
        this.flipCard(target.getAttribute('card-number'), target.getAttribute('index'), target)
      }
      if (target.classList.contains('PlayAgain')) {
        this.content.innerHTML = ''
        this.newGame(this.rows, this.cols)
      }
    }.bind(this)
    this.displayWindow()
  }

  displayWindow () {
    super.displayWindow()
    this.newGame(this.rows, this.cols)
    this.content.addEventListener('click', this.click)
  }
  deleteWindow () {
    this.content.removeEventListener('click', this.click)
    super.deleteWindow()
  }
  newGame (rows, cols) {
    let template = document.querySelectorAll('#memory')[0].content.firstElementChild
    this.pairs = 0
    this.rows = rows
    this.cols = cols
    this.imageArray = this.getImageArray()
    this.imageArray.forEach((element, index) => {
      let img = document.importNode(template, true)
      this.content.appendChild(img)
      if (index === 0) {
        img.focus()
      }
      img.firstElementChild.setAttribute('card-number', element)
      img.firstElementChild.setAttribute('index', index)
      if ((index + 1) % cols === 0) {
        this.content.appendChild(document.createElement('br'))
      }
    })
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
      target.setAttribute('src', '../image/memory/' + element + '.png')
      if (!this.flipOne) {
        this.flipOne = object
      } else if (this.flipOne.index !== object.index) {
        this.flipTwo = object
        if (this.flipOne.element === this.flipTwo.element) {
          window.setTimeout(() => {
            // found a pair
            this.flipOne.target.parentNode.classList.add('Removed')
            this.flipTwo.target.parentNode.classList.add('Removed')
            this.pairs++
            console.log(this.pairs)
            if (this.pairs === (this.rows * this.cols) / 2) {
              this.victory()
            }
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
  victory () {
    console.log('Victory!')
    this.content.innerHTML = ''
    let template = document.querySelectorAll('#memory')[0].content.children[1]
    let victoryView = document.importNode(template, true)
    this.content.appendChild(victoryView)
  }
}
