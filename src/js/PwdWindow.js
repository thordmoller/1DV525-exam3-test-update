export default class PwdWindow {
  constructor (left, top) {
    this.left = left
    this.top = top
    this.displayWindow()
  }

  displayWindow () {
    console.log(this.left + this.right)
    let template = document.querySelector('#window')
    let clone = template.content.cloneNode(true)
    let container = clone.querySelectorAll('.Window')[0]
    container.style.left = this.left + 'px'
    container.style.top = this.top + 'px'
    document.querySelector('body').appendChild(clone)
  }
}
