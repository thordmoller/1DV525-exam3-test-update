export default class PwdWindow {
  /** Represents a window
   * @constructor
   * @param {id} id - An id number to identify each window
   */
  constructor (id) {
    this.id = id
    this.left = (id - 1) * 10
    this.top = (id - 1) * 10
    this.element = undefined
    this.height = undefined
    this.width = undefined
    this.title = 'Title'
    this.iconUrl = undefined
  }
  /** Makes the window appear in the DOM */
  displayWindow () {
    let template = document.querySelector('#window')
    let clone = template.content.cloneNode(true)
    let container = clone.querySelectorAll('.Window')[0]
    container.setAttribute('id', 'w' + this.id)
    container.style.left = this.left + 'px'
    container.style.top = this.top + 'px'
    container.style.zIndex = this.id
    //let nav = container.querySelectorAll('.WindowNav')[0]
    container.querySelectorAll('.WindowTitle')[0].appendChild(document.createTextNode(this.title))
    let content = container.querySelectorAll('.WindowContent')[0]
    content.style.height = this.height + 'px'
    content.style.width = this.width + 'px'
    document.querySelector('body').appendChild(clone)
    this.element = container
  }
  /** Removes the window from DOM */
  deleteWindow () {
    let window = document.querySelector('#w' + this.id)
    document.querySelector('body').removeChild(window)
  }
  makeInactive () {
    this.element.classList.add('Inactive')
    this.element.querySelectorAll('.WindowNav')[0].classList.add('Inactive')
  }
  makeActive () {
    this.element.classList.remove('Inactive')
    this.element.querySelectorAll('.WindowNav')[0].classList.remove('Inactive')
  }
  /**
   * Finds parentNodes recursively from window childnode until the windows first Node is found and returns
   * @param element - child element of Window
   */
  static findWindowNodeFromChild (element) {
    while (element.parentNode) {
      element = element.parentNode
      if (element.classList.contains('Window')) {
        return element
      }
    }
    return null
  }
}
