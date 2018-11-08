export default class PwdWindow {
  constructor (id) {
    this.left = 10 * id
    this.top = 10 * id
  }

  displayWindow () {
    let template = document.querySelector('#window')
    let clone = template.content.cloneNode(true)
    let container = clone.querySelectorAll('.Window')[0]
    container.style.left = this.left + 'px'
    container.style.top = this.top + 'px'
    document.querySelector('body').appendChild(clone)
  }
}
