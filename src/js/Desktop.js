import PwdWindow from './PwdWindow.js'
export default class Desktop {
  /** Represents the Desktop. Keeps track of windows
   * @constructor
   */
  constructor () {
    this.windowAmount = 0
    this.windows = []
  }

  /** Starts listener events */
  waitForAction () {
    document.querySelector('#button').addEventListener('click', this.openWindow.bind(this))
  }

  /** Creates and displays a new window */
  openWindow () {
    if (this.windows.length === 0) {
      this.windowAmount = 1
    } else {
      this.windowAmount = this.windows[this.windows.length - 1].id + 1
    }
    this.windows.push(new PwdWindow(this.windowAmount))
    let w = this.windows[this.windows.length - 1]
    w.displayWindow()

    /** finds given window object in windows array and deletes it
     * @param {PwdWindow} window - The window to be deleted
     */
    let deleteFromList = function (window) {
      let found = false
      for (let i = 0; i < this.windows.length; i++ && !found) {
        if (this.windows[i].id === w.id) {
          this.windows.splice(i, 1)
          found = true
        }
      }
    }.bind(this)
    // eventlistener on the close icon
    document.querySelector('#w' + w.id).querySelectorAll('.WindowClose')[0].addEventListener('click', function () { deleteFromList(w); w.deleteWindow() })

    console.log(this.windows)
  }
}
