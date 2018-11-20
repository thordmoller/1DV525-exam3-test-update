import PwdWindow from './PwdWindow'

export default class Chat extends PwdWindow {
  constructor (id) {
    super(id)
    this.width = '250'
    this.title = 'Chat application'
    this.iconUrl = '../image/double-chat-sprite.png'
    this.displayWindow()
    this.loadApp()
  }

  loadApp () {
    if (window.localStorage.getItem('username') === null) {
      this.requestUsername()
    } else {
      this.showChatElements()
    }
  }
  showChatElements () {
    let container = this.element.querySelectorAll('.WindowContent')[0]
    let template = document.querySelector('#chatApp')
    let clone = template.content.cloneNode(true)
    clone.appendChild(document.createTextNode(window.localStorage.getItem('username')))
    container.appendChild(clone)
  }
  requestUsername () {
    let template = document.querySelector('#chatUsername')
    let clone = template.content.cloneNode(true)
    let container = this.element.querySelectorAll('.WindowContent')[0]
    container.appendChild(clone)
    let click = function () {
      let value = container.querySelectorAll('input')[0].value
      if (value !== '') {
        window.localStorage.setItem('username', value)
        container.querySelectorAll('input')[1].removeEventListener('click', click)
        container.removeChild(container.querySelectorAll('form')[0])
        this.showChatElements()
      }
    }.bind(this)
    container.querySelectorAll('input')[1].addEventListener('click', click)
  }
}
