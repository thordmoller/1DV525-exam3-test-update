import Chat from './Chat.js'
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
      e.preventDefault() // prevent text highlight

      /** moves a window */
      let mouseMove = function (e) {
        windowNode = Chat.findWindowNodeFromChild(element)
        windowNode.style.left = initLeft + (e.clientX - mouseX) + 'px'
        windowNode.style.top = initTop + (e.clientY - mouseY) + 'px'
      }
      /** Deletes eventlisteners on mouserelease */
      let mouseUp = function (e) {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseUp', mouseUp)
        document.removeEventListener('mouseDown', this.mouseDown)
      }
      // if clicked element is a windows top panel
      if (element.classList.contains('WindowNav') || element.classList.contains('WindowIcon') || element.classList.contains('WindowTitle')) {
        windowNode = Chat.findWindowNodeFromChild(element)
        let window = this.getWindowFromElement(windowNode)
        if (windowNode.classList.contains('Inactive')) {
          this.setActiveWindow(window)
        }

        // the top and left css values before dragging window
        initLeft = parseInt(windowNode.style.left)
        initTop = parseInt(windowNode.style.top)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp.bind(this))
      }
      if (element.classList.contains('WindowClose')) {
        windowNode = Chat.findWindowNodeFromChild(element)
        let window = this.getWindowFromElement(windowNode)
        this.disposeWindow(window)
      }
      if (element.classList.contains('ChatButton')) {
        this.openWindow(new Chat(this.windows.length + 1))
      }
    }.bind(this)
  }

  /** Starts listener events */
  waitForAction () {
    document.addEventListener('mousedown', this.mouseDown)
  }
  /** Creates and displays a new window */
  openWindow (window) {
    this.setActiveWindow(window)
    this.windows.push(window)
    this.windowAmount = this.windows.length
  }
  /** finds given window object in windows array and deletes it. Also runs the objects function to delete itself from the DOM.
   *  @param {PwdWindow} window - The window to be deleted
   */
  disposeWindow (window) {
    for (let i = 0; i < this.windows.length; i++) {
      if (this.windows[i].id === window.id) {
        this.windows.splice(i, 1)
        window.deleteWindow()
        break // to not run the loop longer than necessary
      }
    }
  }
  /** sets a specified window active and makes the curren one inactive
   * @param {PwdWindow} window - The window to become active
   */
  setActiveWindow (window) {
    window.makeActive()
    let oldZ = 0 // Z-index of current active window
    if (this.windows.length > 0) {
      oldZ = parseInt(this.activeWindow.element.style.zIndex)
      this.activeWindow.makeInactive()
    }
    window.element.style.zIndex = oldZ + 1
    this.activeWindow = window
  }
  /** Returns window object from html element
   * @param element - The window element
   */
  getWindowFromElement (element) {
    let window
    let id = element.getAttribute('id')
    for (let i = 0; i < this.windows.length; i++) {
      if (this.windows[i].id === parseInt(id.substring(1))) {
        window = this.windows[i]
        break
      }
    }
    return window
  }
}
