import PwdWindow from './PwdWindow'

export default class About extends PwdWindow {
  constructor (id) {
    super(id)
    this.title = 'About'
    this.iconUrl = '../image/question-mark-sprite.png'
    this.width = 400
    this.displayWindow()
  }
  displayWindow () {
    super.displayWindow()
    let template = document.querySelector('#about').content
    let about = document.importNode(template, true)
    this.content.appendChild(about)
  }
}
