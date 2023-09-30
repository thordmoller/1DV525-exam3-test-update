import PwdWindow from './PwdWindow'

export default class Paint extends PwdWindow {
  constructor (id) {
    super(id)
    this.title = 'Paint'
    this.iconUrl = new URL('../image/paint-sprite.png', import.meta.url)
    this.displayWindow()
    this.previousX = 0
    this.previousY = 0
    this.mousemove = function (event) {
      const mousepos = this.getMousePos(this.content.querySelectorAll('.Sheet')[0], event)
      this.draw(mousepos.x, mousepos.y)
    }.bind(this)
    this.mouseup = function () {
      this.content.querySelectorAll('.Sheet')[0].removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
      this.previousX = 0
      this.previousy = 0
    }.bind(this)
  }

  displayWindow () {
    super.displayWindow()
    this.setup()
  }

  setup () {
    const template = document.querySelector('#paint').content
    let canvas = document.importNode(template, true)
    this.content.appendChild(canvas)
    canvas = this.content.querySelectorAll('.Sheet')[0]
    const cx = canvas.getContext('2d')
    canvas.setAttribute('width', 800)
    canvas.setAttribute('height', 600)
    cx.lineCap = 'round'
    const button = this.element.querySelectorAll('button')[0]
    button.addEventListener('click', this.clear.bind(this))
    const slider = this.content.querySelectorAll('input')[1]
    slider.oninput = () => {
      const sliderlabel = this.content.querySelectorAll('label')[2]
      sliderlabel.innerText = slider.value
    }
    canvas.addEventListener('mousedown', function (event) {
      const mousepos = this.getMousePos(this.content.querySelectorAll('.Sheet')[0], event)
      this.draw(mousepos.x, mousepos.y)
      event.target.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    }.bind(this))
  }

  draw (x, y) {
    const canvas = this.content.querySelectorAll('.Sheet')[0]
    const cx = canvas.getContext('2d')
    cx.strokeStyle = this.content.querySelectorAll('input')[0].value
    cx.lineWidth = this.content.querySelectorAll('input')[1].value
    cx.beginPath()
    if (this.previousX > 0 && this.previousY > 0) {
      cx.moveTo(this.previousX, this.previousY)
    }
    cx.lineTo(x, y)
    cx.stroke()
    cx.closePath()
    this.previousX = x
    this.previousY = y
  }

  getMousePos (canvas, evt) {
    const rect = canvas.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }

  clear () {
    const canvas = this.content.querySelectorAll('.Sheet')[0]
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}
