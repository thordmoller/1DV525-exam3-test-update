import PwdWindow from './PwdWindow'

export default class Chat extends PwdWindow {
  constructor (id) {
    super(id)
    this.width = '200'
    this.title = 'Chat application'
    this.displayWindow()
    this.loadApp()
  }

  loadApp () {
    let template = document.querySelector('#chatApp')
    let clone = template.content.cloneNode(true)
    let container = this.element.querySelectorAll('.WindowContent')[0]

    container.appendChild(clone)
  }
}
