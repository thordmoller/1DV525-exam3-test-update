import PwdWindow from './PwdWindow'

export default class Paint extends PwdWindow {
  constructor (id) {
    super(id)
    this.title = 'Paint'
    this.iconUrl = '../image/paint-sprite.png'
    this.displayWindow()
    this.mousemove = function (event) {
      let mousepos = this.getMousePos(this.content.querySelectorAll('.Sheet')[0], event)
      this.draw(mousepos.x, mousepos.y)
    }.bind(this)
    this.mouseup = function () {
      this.content.querySelectorAll('.Sheet')[0].removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    }.bind(this)
  }
  displayWindow () {
    super.displayWindow()
    this.setup()
  }

  setup () {
    let template = document.querySelector('#paint').content
    let canvas = document.importNode(template, true)
    this.content.appendChild(canvas)
    canvas = this.content.querySelectorAll('.Sheet')[0]
    let cx = canvas.getContext('2d')
    canvas.setAttribute('width', 800)
    canvas.setAttribute('height', 600)
    cx.lineWidth = 20
    cx.lineCap = 'round'
    cx.strokeStyle = 'black'
    canvas.addEventListener('mousedown', function (event) {
      event.target.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    }.bind(this))
  }

  draw (x, y) {
    let canvas = this.content.querySelectorAll('.Sheet')[0]
    this.cx = canvas.getContext('2d')
    this.cx.beginPath()
    this.cx.moveTo(x, y)
    this.cx.lineTo(x, y)
    this.cx.stroke()
    this.cx.closePath()
      /*this.cx.fillStyle = 'rgb(200, 0, 0)'
      this.cx.fillRect(10, 10, 50, 50)
      this.cx.fillStyle = 'rgba(0, 0, 200, 0.5)'
      this.cx.fillRect(0, 0, 100, 60)
      this.cx.closePath()*/
  }
  getMousePos (canvas, evt) {
    let rect = canvas.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }
}
