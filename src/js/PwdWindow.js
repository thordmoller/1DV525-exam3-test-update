export default class PwdWindow {
  /** Represents a window
   * @constructor
   * @param {id} id - An id number to identify each window
   */
  constructor (id) {
    this.id = id
    this.left = (id - 1) * 10
    this.top = (id - 1) * 10
  }
  /** Makes the window appear in the DOM */
  displayWindow () {
    let template = document.querySelector('#window')
    let clone = template.content.cloneNode(true)
    let container = clone.querySelectorAll('.Window')[0]
    container.setAttribute('id', 'w' + this.id)
    container.style.left = this.left + 'px'
    container.style.top = this.top + 'px'
    document.querySelector('body').appendChild(clone)
  }
  /** Removes the window from DOM */
  deleteWindow () {
    let window = document.querySelector('#w' + this.id)
    document.querySelector('body').removeChild(window)
  }
}
