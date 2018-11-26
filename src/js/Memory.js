import PwdWindow from './PwdWindow'

export default class Memory extends PwdWindow {
  constructor (id, rows, cols) {
    super(id)
    this.rows = rows
    this.cols = cols
    this.title = 'Memory Game'
    this.iconUrl = '../image/cards-sprite.png'
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
}
