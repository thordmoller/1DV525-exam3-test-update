export default class PwdWindow {
  constructor () {
    this.displayWindow()
  }

  displayWindow () {
    let template = document.querySelector('#window')
    let clone = template.content.cloneNode(true)
    document.querySelector('body').appendChild(clone)
  }
}
