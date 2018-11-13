import PwdWindow from './PwdWindow.js'
export default class Desktop {
  /** Represents the Desktop. Keeps track of windows
   * @constructor
   */
  constructor () {
    this.windowAmount = 0
    this.windows = []
    this.activeWindow = undefined
    /** Identifies clicked object */
    this.mouseDown = function (e) {
      // clicked element
      let element = e.target
      // position of mouse before dragging window
      let mouseX = e.clientX
      let mouseY = e.clientY
      // the window container div
      let windowNode
      // the top and left css values before dragging window
      let initLeft
      let initTop

      /** moves a window */
      let mouseMove = function (e) {
        windowNode.style.left = initLeft + (e.clientX - mouseX) + 'px'
        windowNode.style.top = initTop + (e.clientY - mouseY) + 'px'
      }
      /** Deletes eventlisteners on mouserelease */
      let mouseUp = function (e) {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseUp', mouseUp)
        document.removeEventListener('mouseDown', this.mouseDown)
      }
      // if clicked element is a window
      if (element.classList.contains('WindowNav')) {
        windowNode = element.parentNode
        let window = this.getWindowFromElement(windowNode)
        if (element.classList.contains('Inactive')) {
          element.classList.remove('Inactive')
          windowNode.classList.remove('Inactive')
          this.setActiveWindow(window)
        }

        // the top and left css values before dragging window
        initLeft = parseInt(windowNode.style.left)
        initTop = parseInt(windowNode.style.top)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp.bind(this))
        e.preventDefault() // prevent text highlight on drag
      }
    }.bind(this)
  }

  /** Starts listener events */
  waitForAction () {
    document.querySelector('#button').addEventListener('click', this.openWindow.bind(this))
    document.addEventListener('mousedown', this.mouseDown)
  }
  /** Creates and displays a new window */
  openWindow () {
    if (this.windows.length === 0) {
      this.activeWindow = undefined
    }
    if (this.windows.length === 0) {
      this.windowAmount = 1
    } else {
      this.windowAmount = this.windows[this.windows.length - 1].id + 1
    }
    this.windows.push(new PwdWindow(this.windowAmount))
    let w = this.windows[this.windows.length - 1]
    this.setActiveWindow(w)
    //w.displayWindow()

    /** finds given window object in windows array and deletes it
     * @param {PwdWindow} window - The window to be deleted 1
     */
    let deleteFromList = function (window) {
      for (let i = 0; i < this.windows.length; i++) {
        if (this.windows[i].id === w.id) {
          this.windows.splice(i, 1)
          break // to not run the loop longer than necessary
        }
      }
    }.bind(this)
    // eventlistener on the close icon
    let element = document.querySelector('#w' + w.id)
    element.querySelectorAll('.WindowClose')[0].addEventListener('click', function () { deleteFromList(w); w.deleteWindow() })
    console.log(this.windows)
  }
  setActiveWindow (window) {
    let oldZ = 0
    if (this.activeWindow !== undefined) {
      oldZ = parseInt(this.activeWindow.element.style.zIndex)
      this.activeWindow.element.classList.add('Inactive')
      this.activeWindow.element.querySelectorAll('.WindowNav')[0].classList.add('Inactive')
    }
    window.element.style.zIndex = oldZ + 1
    this.activeWindow = window
  }
  getWindowFromElement (element) {
    let window
    let id = element.getAttribute('id')
    for (let i = 0; i < this.windows.length; i++) {
      if (this.windows[i].id == id.substring(1)) {
        window = this.windows[i]
        break
      }
    }
    return window
  }
}
