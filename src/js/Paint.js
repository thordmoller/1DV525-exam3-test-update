import PwdWindow from './PwdWindow'

export default class Paint extends PwdWindow {
  constructor (id) {
    super(id)
    this.title = 'Paint'
    this.iconUrl = '../image/paint-sprite.png'
    this.displayWindow()
  }
  displayWindow () {
    super.displayWindow()
    let template = document.querySelector('#paint').content
    let clone = document.importNode(template, true)
    this.content.appendChild(clone)
  }
}
