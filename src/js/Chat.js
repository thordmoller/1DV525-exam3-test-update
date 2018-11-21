import PwdWindow from './PwdWindow'

export default class Chat extends PwdWindow {
  constructor (id) {
    super(id)
    this.width = '250'
    this.title = 'Chat application'
    this.iconUrl = '../image/double-chat-sprite.png'
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.displayWindow()
  }
  /** Extends the initial method with a call to close the socket */
  deleteWindow () {
    super.deleteWindow()
    this.socket.close()
  }
  /** Extends the initial method by adding chat-related content to the window */
  displayWindow () {
    super.displayWindow()
    if (window.localStorage.getItem('username') === null) {
      this.requestUsername()
    } else {
      this.showChatElements()
    }
  }
  /** Adds the visual elements of a chat windows content */
  showChatElements () {
    let container = this.element.querySelectorAll('.WindowContent')[0]
    let template = document.querySelector('#chatApp')
    let clone = template.content.cloneNode(true)
    container.appendChild(clone)
    let textarea = container.querySelectorAll('textarea')[0]
    container.querySelectorAll('input')[0].addEventListener('click', () => {
      if (textarea !== '') {
        let data = {
          'type': 'message',
          'data': textarea.value,
          'username': window.localStorage.getItem('username'),
          'channel': 'hej',
          'key': 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
        this.socket.send(JSON.stringify(data))
        textarea.value = ''
      }
    })
    // for sending on pressing enter
    textarea.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        container.querySelectorAll('input')[0].click()
      }
    })
    this.socket.addEventListener('open', event => {
      // this.socket.send(JSON.stringify(data))
    })
    this.socket.addEventListener('message', event => {
      let data = JSON.parse(event.data)
      let div = document.createElement('div')
      if (data['type'] === 'message' || data['type'] === 'notification') {
        let output = data['username'] + ' says: ' + data['data']
        div.appendChild(document.createTextNode(output))
        let messageDiv = this.element.querySelectorAll('.Messages')[0]
        messageDiv.appendChild(div)
        messageDiv.scrollTop = messageDiv.scrollHeight // scroll down the div containing messages
      } else {
        console.log(data)
      }
    })
  }
  /** Displays an input field asking the user to provide a username */
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
