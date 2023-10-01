import PwdWindow from './PwdWindow'

import * as images from '../image/memory/*.png'// manually import images used in the game

export default class Memory extends PwdWindow {
  constructor (id, rows, cols) {
    super(id)
    this.rows = rows
    this.cols = cols
    this.title = 'Memory Game'
    this.iconUrl = new URL('../image/cards-sprite.png', import.meta.url)
    this.imageArray = this.getImageArray()
    this.flipOne = undefined
    this.flipTwo = undefined
    this.pairs = 0

    this.click = function (e) {
      let target = e.target

      if (target.nodeName === 'A') {
        target = target.firstElementChild
      }

      if (target.classList.contains('MemoryImage') && !target.classList.contains('Removed')) {
        this.flipCard(target.getAttribute('card-number'), target.getAttribute('index'), target)
      }

      if (target.classList.contains('PlayAgain')) {
        this.content.innerHTML = ''
        this.newGame(this.rows, this.cols)
      }
    }.bind(this)

    this.keyDown = function (e) {
      if (document.activeElement.childNodes[0].classList.contains('MemoryImage')) {
        let activeIndex = parseInt(document.activeElement.querySelectorAll('.MemoryImage')[0].getAttribute('index'))

        if (e.keyCode === 37) {
          // left press
          if (activeIndex > 0) {
            const previousSibling = Memory.previousImgSibling(document.activeElement)
            activeIndex = previousSibling.childNodes[0].getAttribute('index')
          } else {
            activeIndex = this.content.lastChild.previousSibling.firstElementChild.getAttribute('index')
          }
        }

        if (e.keyCode === 39) {
          // right press
          if (activeIndex < (this.rows * this.cols) - 1) {
            const nextSibling = Memory.nextImgSibling(document.activeElement)
            activeIndex = nextSibling.childNodes[0].getAttribute('index')
          } else {
            activeIndex = this.content.firstElementChild.firstElementChild.getAttribute('index')
          }
        }

        if (e.keyCode === 38) {
          // up press
          activeIndex = this.upwardsIndex(activeIndex)
        }

        if (e.keyCode === 40) {
          // down press
          activeIndex = this.downwardsIndex(activeIndex)
        }
        try {
          this.setFocus(activeIndex)
        } catch (e) {
          console.log(e)
        }
      }
    }.bind(this)
    this.displayWindow()
  }

  upwardsIndex (activeIndex) {
    let temp = activeIndex - this.cols
    if (temp < 0) {
      temp = (this.rows * this.cols) + temp
    }
    return temp
  }

  downwardsIndex (activeIndex) {
    let temp = activeIndex + this.cols
    if (temp > (this.rows * this.cols) - 1) {
      temp = temp - (this.rows * this.cols)
    }
    return temp
  }

  displayWindow () {
    super.displayWindow()
    this.newGame(this.rows, this.cols)
    this.content.addEventListener('click', this.click)
    this.content.addEventListener('keydown', this.keyDown)
  }

  deleteWindow () {
    this.content.removeEventListener('click', this.click)
    super.deleteWindow()
  }

  newGame (rows, cols) {
    const template = document.querySelectorAll('#memory')[0].content.firstElementChild
    this.pairs = 0
    this.rows = rows
    this.cols = cols
    this.imageArray = this.getImageArray()
    this.imageArray.forEach((element, index) => {
      const img = document.importNode(template, true)
      this.content.appendChild(img)
      img.firstElementChild.setAttribute('card-number', element)
      img.firstElementChild.setAttribute('index', index)
      if ((index + 1) % cols === 0) {
        this.content.appendChild(document.createElement('br'))
      }
    })
    this.setFocus(-1)
  }

  setFocus (activeIndex) {
    window.setTimeout(() => {
      let focus
      if (activeIndex === -1) {
        focus = this.content.querySelectorAll('IMG[index="0"]')[0]
      } else {
        focus = this.content.querySelectorAll('IMG[index="' + activeIndex + '"]')[0]
      }
      focus.parentElement.focus()
    }, 0)
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
      const randomIndex = Math.floor(Math.random() * i)
      // swap it with the current element
      const temporaryValue = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  flipCard (element, index, target) {
    if (target.nodeName !== 'IMG') {
      target = target.firstElementChild
    }
    const object = { element, index, target }
    const unknownSrc = images[0]
    if (!this.flipOne || !this.flipTwo) {
      target.setAttribute('src', images[element])
      if (!this.flipOne) {
        this.flipOne = object
      } else if (this.flipOne.index !== object.index) {
        this.flipTwo = object
        if (this.flipOne.element === this.flipTwo.element) {
          window.setTimeout(() => {
            // found a pair
            this.flipOne.target.classList.add('Removed')
            this.flipTwo.target.classList.add('Removed')
            this.pairs++
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
    this.content.innerHTML = ''
    const template = document.querySelectorAll('#memory')[0].content.children[1]
    const victoryView = document.importNode(template, true)
    this.content.appendChild(victoryView)
  }

  static nextImgSibling (activeElement) {
    if (activeElement.nextElementSibling.tagName !== 'A') {
      return Memory.nextImgSibling(activeElement.nextElementSibling)
    }
    return activeElement.nextElementSibling
  }

  static previousImgSibling (activeElement) {
    if (activeElement.previousSibling.tagName !== 'A') {
      return Memory.previousImgSibling(activeElement.previousSibling)
    }
    return activeElement.previousSibling
  }
}
