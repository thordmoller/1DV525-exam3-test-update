export default class PwdWindow {
  /** Represents a window
   * @constructor
   * @param {Number} id - An id number to identify each window
   * @property {Number} top - Initial top position when the window renders
   * @property {Number} left - Initial left position when the window renders
   * @property {Element} element - The html element of the outer window div
   * @property {Element} content - The html element of the window content
   * @property {String} title - Title of the window which appears in top bar
   * @property {String} iconUrl - the url to the icon to be displayed in the top bar
   * @property {NUmber} height - Optionally set for subclasses
   * @property {NUmber} width - Optionally set for subclasses
   * */
  constructor (id) {
    this.id = id
    this.left = (id - 1) * 10
    this.top = (id - 1) * 10
    this.element = undefined
    this.content = undefined
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
    // add title to window
    container.querySelectorAll('.WindowTitle')[0].appendChild(document.createTextNode(this.title))
    this.content = container.querySelectorAll('.WindowContent')[0]
    container.querySelectorAll('.WindowIcon')[0].style.backgroundImage = "url('" + this.iconUrl + "')"
    this.content.style.height = this.height + 'px'
    this.content.style.width = this.width + 'px'
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
