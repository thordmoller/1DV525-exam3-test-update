import PwdWindow from './PwdWindow'

export default class Chat extends PwdWindow {
  constructor (id) {
    super(id)
    this.width = '300'
    this.title = 'Chat application'
    this.iconUrl = '../image/double-chat-sprite.png'
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.channel = window.localStorage.getItem('channel')
    this.displayWindow()
    this.lastMessageDate = undefined
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
    let channelbutton = container.querySelectorAll('button')[0]
    container.querySelectorAll('input')[0].value = this.channel
    channelbutton.addEventListener('click', () => {
      console.log('hej')
      let newChannel = this.content.querySelectorAll('input')[0].value
      window.localStorage.setItem('channel', newChannel)
      this.channel = newChannel
    })
    console.log(channelbutton)
    container.querySelectorAll('input')[1].addEventListener('click', () => {
      textarea.value = textarea.value.trim()
      if (textarea.value !== '') {
        let data = {
          'type': 'message',
          'data': textarea.value,
          'username': window.localStorage.getItem('username'),
          'channel': this.channel,
          'key': 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
        this.socket.send(JSON.stringify(data))
        textarea.value = ''
      }
    })
    // for sending on pressing enter
    textarea.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        if (textarea.value !== '') {
          container.querySelectorAll('input')[1].click()
        }
      }
    })
    this.socket.addEventListener('open', event => {
      // this.socket.send(JSON.stringify(data))
    })
    this.socket.addEventListener('message', event => {
      let data = JSON.parse(event.data)
      console.log(data)
      if (data['type'] === 'notification') {
        this.displayMessage(data)
      }
      if (data['type'] === 'message') {
        if ((this.channel !== '' && this.channel === data['channel']) || (this.channel === '')) {
          this.displayMessage(data)
        }
      } else {
        console.log(data)
      }
    })
  }
  displayMessage (data) {
    if (data['data'] !== '') {
      let p = document.createElement('p')
      let messageDiv = this.element.querySelectorAll('.Messages')[0]
      let time = new Date()
      time.setSeconds(0)
      time.setMilliseconds(0)
      let output = ''
      if (this.isNewDate(time)) {
        output += time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate()
        p.appendChild(document.createTextNode(output))
        p.setAttribute('class', 'Username')
        messageDiv.appendChild(p)
      }
      if (time > this.lastMessageDate || this.lastMessageDate === undefined) {
        let hours = time.getHours()
        let minutes = time.getMinutes()
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        output = hours + ':' + minutes
        this.lastMessageDate = time
        p = document.createElement('p')
        p.appendChild(document.createTextNode(output))
        p.setAttribute('class', 'Username')
        messageDiv.appendChild(p)
      }
      output = data['username'] + ' says: '
      p = document.createElement('p')
      let span = document.createElement('span')
      span.appendChild(document.createTextNode(output))
      span.setAttribute('class', 'Username')
      p.appendChild(span)
      p.appendChild(document.createElement('br'))
      p.appendChild(document.createTextNode(data['data']))
      if (data['username'] === window.localStorage.getItem('username')) {
        p.setAttribute('class', 'ThisUser')
      }
      messageDiv.appendChild(p)
      messageDiv.scrollTop = messageDiv.scrollHeight // scroll down the div containing messages
    }
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
  /**
   * @param {Date} date
   */
  isNewDate (date) {
    let newDate = new Date(date.getTime())
    newDate.setHours(0)
    newDate.setMinutes(0)
    let oldDate
    if (this.lastMessageDate !== undefined) {
      oldDate = new Date(this.lastMessageDate.getTime())
    } else {
      return true
    }
    oldDate.setHours(0)
    oldDate.setMinutes(0)
    if (newDate > oldDate) {
      return true
    }
    return false
  }
}
