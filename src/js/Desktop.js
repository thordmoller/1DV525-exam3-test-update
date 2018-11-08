import PwdWindow from './PwdWindow.js'
export default class Desktop {
  constructor () {
    this.windows = 0

    let openWindow = function () {
      console.log(this.windows.valueOf())
      let w = new PwdWindow(this.windows + 1)
      this.windows = this.windows + 1
      w.displayWindow()
    }.bind(this)

    document.querySelector('#button').addEventListener('click', openWindow)
  }
}
