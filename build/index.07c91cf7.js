function e(e,t,i,n){Object.defineProperty(e,t,{get:i,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},s=t.parcelRequire5b12;null==s&&((s=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var s={id:e,exports:{}};return i[e]=s,t.call(s.exports,s,s.exports),s.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequire5b12=s),s.register("27Lyk",function(t,i){e(t.exports,"register",()=>n,e=>n=e),e(t.exports,"resolve",()=>s,e=>s=e);var n,s,o={};n=function(e){for(var t=Object.keys(e),i=0;i<t.length;i++)o[t[i]]=e[t[i]]},s=function(e){var t=o[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),s("27Lyk").register(JSON.parse('{"2w0Uv":"index.07c91cf7.js","dqG7k":"0.6520e4d5.png","4yhVw":"1.9d1dcf44.png","6D9tX":"2.205564e0.png","bwZT6":"3.cb5cbd1a.png","lVg3p":"4.7552512a.png","bdoVV":"5.61ac622e.png","iPj5e":"6.47d164e3.png","8af1c":"7.7e927ab5.png","g2d1W":"8.6674d403.png"}'));//import Chat from './Chat.js'	//deactivated until there is a working server again
class o{/** Represents a window
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
   * */constructor(e){this.id=e,this.left=(e-1)*10,this.top=(e-1)*10,this.element=void 0,this.content=void 0,this.height=void 0,this.width=void 0,this.title="Title",this.iconUrl=void 0}/** Makes the window appear in the DOM */displayWindow(){let e=document.querySelector("#window").content.cloneNode(!0),t=e.querySelectorAll(".Window")[0];t.setAttribute("id","w"+this.id),t.style.left=this.left+"px",t.style.top=this.top+"px",t.style.zIndex=this.id,// add title to window
t.querySelectorAll(".WindowTitle")[0].appendChild(document.createTextNode(this.title)),this.content=t.querySelectorAll(".WindowContent")[0],t.querySelectorAll(".WindowIcon")[0].style.backgroundImage="url('"+this.iconUrl+"')",this.content.style.height=this.height+"px",this.content.style.width=this.width+"px",document.querySelector("body").appendChild(e),this.element=t}/** Removes the window from DOM */deleteWindow(){let e=document.querySelector("#w"+this.id);document.querySelector("body").removeChild(e)}makeInactive(){this.element.classList.add("Inactive"),this.element.querySelectorAll(".WindowNav")[0].classList.add("Inactive")}makeActive(){this.element.classList.remove("Inactive"),this.element.querySelectorAll(".WindowNav")[0].classList.remove("Inactive")}/**
   * Finds parentNodes recursively from window childnode until the windows first Node is found and returns
   * @param element - child element of Window
   */static findWindowNodeFromChild(e){for(;e.parentNode;)if((e=e.parentNode).classList.contains("Window"))return e;return null}}var l={},r={};r=new URL(s("27Lyk").resolve("dqG7k"),import.meta.url).toString();var d={};d=new URL(s("27Lyk").resolve("4yhVw"),import.meta.url).toString();var c={};c=new URL(s("27Lyk").resolve("6D9tX"),import.meta.url).toString();var h={};h=new URL(s("27Lyk").resolve("bwZT6"),import.meta.url).toString();var a={};a=new URL(s("27Lyk").resolve("lVg3p"),import.meta.url).toString();var u={};u=new URL(s("27Lyk").resolve("bdoVV"),import.meta.url).toString();var m={};m=new URL(s("27Lyk").resolve("iPj5e"),import.meta.url).toString();var p={};p=new URL(s("27Lyk").resolve("8af1c"),import.meta.url).toString();l={0:r,1:d,2:c,3:h,4:a,5:u,6:m,7:p,8:new URL(s("27Lyk").resolve("g2d1W"),import.meta.url).toString()};class w extends o{constructor(e,t,i){super(e),this.rows=t,this.cols=i,this.title="Memory Game",this.iconUrl="../image/cards-sprite.png",this.imageArray=this.getImageArray(),this.flipOne=void 0,this.flipTwo=void 0,this.pairs=0,this.click=(function(e){let t=e.target;"A"===t.nodeName&&(t=t.firstElementChild),t.classList.contains("MemoryImage")&&!t.classList.contains("Removed")&&this.flipCard(t.getAttribute("card-number"),t.getAttribute("index"),t),t.classList.contains("PlayAgain")&&(this.content.innerHTML="",this.newGame(this.rows,this.cols))}).bind(this),this.keyDown=(function(e){if(document.activeElement.childNodes[0].classList.contains("MemoryImage")){let t=parseInt(document.activeElement.querySelectorAll(".MemoryImage")[0].getAttribute("index"));37===e.keyCode&&(t=t>0?w.previousImgSibling(document.activeElement).childNodes[0].getAttribute("index"):this.content.lastChild.previousSibling.firstElementChild.getAttribute("index")),39===e.keyCode&&(t=t<this.rows*this.cols-1?w.nextImgSibling(document.activeElement).childNodes[0].getAttribute("index"):this.content.firstElementChild.firstElementChild.getAttribute("index")),38===e.keyCode&&(t=this.upwardsIndex(t)),40===e.keyCode&&(t=this.downwardsIndex(t));try{this.setFocus(t)}catch(e){console.log(e)}}}).bind(this),this.displayWindow()}upwardsIndex(e){let t=e-this.cols;return t<0&&(t=this.rows*this.cols+t),t}downwardsIndex(e){let t=e+this.cols;return t>this.rows*this.cols-1&&(t-=this.rows*this.cols),console.log(t),t}displayWindow(){super.displayWindow(),this.newGame(this.rows,this.cols),this.content.addEventListener("click",this.click),this.content.addEventListener("keydown",this.keyDown)}deleteWindow(){this.content.removeEventListener("click",this.click),super.deleteWindow()}newGame(e,t){let i=document.querySelectorAll("#memory")[0].content.firstElementChild;this.pairs=0,this.rows=e,this.cols=t,this.imageArray=this.getImageArray(),this.imageArray.forEach((e,n)=>{let s=document.importNode(i,!0);this.content.appendChild(s),s.firstElementChild.setAttribute("card-number",e),s.firstElementChild.setAttribute("index",n),(n+1)%t==0&&this.content.appendChild(document.createElement("br"))}),this.setFocus(-1)}setFocus(e){window.setTimeout(()=>{(-1===e?this.content.querySelectorAll('IMG[index="0"]')[0]:this.content.querySelectorAll('IMG[index="'+e+'"]')[0]).parentElement.focus()},0)}getImageArray(){let e=[];for(let t=1;t<=this.cols*this.rows/2;t++)e.push(t),e.push(t);return w.shuffleArray(e)}/**
	 * Returns a shuffled version of provided array
	 * The "Fisher-Yates algorithm"
	 * inspired by: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
	 * @param {*} array - array to be shuffled
	 */static shuffleArray(e){for(let t=e.length-1;t>0;t--){// Pick a remaining element
let i=Math.floor(Math.random()*t),n=e[t];e[t]=e[i],e[i]=n}return e}flipCard(e,t,i){"IMG"!==i.nodeName&&(i=i.firstElementChild);let n={element:e,index:t,target:i},s=l[0];this.flipOne&&this.flipTwo||(console.log(e),i.setAttribute("src",l[e]),this.flipOne?this.flipOne.index!==n.index&&(this.flipTwo=n,this.flipOne.element===this.flipTwo.element&&window.setTimeout(()=>{// found a pair
this.flipOne.target.classList.add("Removed"),this.flipTwo.target.classList.add("Removed"),this.pairs++,this.pairs===this.rows*this.cols/2&&this.victory()},500),window.setTimeout(()=>{this.flipOne.target.src=s,this.flipTwo.target.src=s,this.flipOne=void 0,this.flipTwo=void 0},500)):this.flipOne=n)}victory(){this.content.innerHTML="";let e=document.querySelectorAll("#memory")[0].content.children[1],t=document.importNode(e,!0);this.content.appendChild(t)}static nextImgSibling(e){return"A"!==e.nextElementSibling.tagName?w.nextImgSibling(e.nextElementSibling):e.nextElementSibling}static previousImgSibling(e){return"A"!==e.previousSibling.tagName?w.previousImgSibling(e.previousSibling):e.previousSibling}}class g extends o{constructor(e){super(e),this.title="Paint",this.iconUrl="../image/paint-sprite.png",this.displayWindow(),this.previousX=0,this.previousY=0,this.mousemove=(function(e){let t=this.getMousePos(this.content.querySelectorAll(".Sheet")[0],e);this.draw(t.x,t.y)}).bind(this),this.mouseup=(function(){this.content.querySelectorAll(".Sheet")[0].removeEventListener("mousemove",this.mousemove),document.removeEventListener("mouseup",this.mouseup),this.previousX=0,this.previousy=0}).bind(this)}displayWindow(){super.displayWindow(),this.setup()}setup(){let e=document.querySelector("#paint").content,t=document.importNode(e,!0);this.content.appendChild(t);let i=(t=this.content.querySelectorAll(".Sheet")[0]).getContext("2d");t.setAttribute("width",800),t.setAttribute("height",600),i.lineCap="round",this.element.querySelectorAll("button")[0].addEventListener("click",this.clear.bind(this));let n=this.content.querySelectorAll("input")[1];n.oninput=()=>{this.content.querySelectorAll("label")[2].innerText=n.value},t.addEventListener("mousedown",(function(e){let t=this.getMousePos(this.content.querySelectorAll(".Sheet")[0],e);this.draw(t.x,t.y),e.target.addEventListener("mousemove",this.mousemove),document.addEventListener("mouseup",this.mouseup)}).bind(this))}draw(e,t){let i=this.content.querySelectorAll(".Sheet")[0].getContext("2d");i.strokeStyle=this.content.querySelectorAll("input")[0].value,i.lineWidth=this.content.querySelectorAll("input")[1].value,i.beginPath(),this.previousX>0&&this.previousY>0&&i.moveTo(this.previousX,this.previousY),i.lineTo(e,t),i.stroke(),i.closePath(),this.previousX=e,this.previousY=t}getMousePos(e,t){let i=e.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}}clear(){let e=this.content.querySelectorAll(".Sheet")[0],t=e.getContext("2d");t.clearRect(0,0,e.width,e.height)}}class v extends o{constructor(e){super(e),this.title="About",this.iconUrl="../image/question-mark-sprite.png",this.width=400,this.displayWindow()}displayWindow(){super.displayWindow();let e=document.querySelector("#about").content,t=document.importNode(e,!0);this.content.appendChild(t)}}new class{/** Represents the Desktop. Keeps track of windows
	 * @constructor
	 */constructor(){this.windowAmount=0,this.windows=[],this.activeWindow=void 0,/** Identifies clicked object */this.mouseDown=(function(e){// clicked element
let t,i,n,s=e.target,l=e.clientX,r=e.clientY;"HTML"===e.target.tagName&&e.preventDefault();/** moves a window */let d=function(e){(t=o.findWindowNodeFromChild(s)).style.left=i+(e.clientX-l)+"px",t.style.top=n+(e.clientY-r)+"px"},c=function(){0>parseInt(t.style.top)&&(t.style.top="0px"),0>parseInt(t.style.left)&&(t.style.left="0px"),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",c),document.addEventListener("mousedown",this.mouseDown)//start listening to clicks again
};// if clicked element is a windows top panel
if(s.classList.contains("WindowNav")||s.classList.contains("WindowIcon")||s.classList.contains("WindowTitle")){t=o.findWindowNodeFromChild(s);let l=this.getWindowFromElement(t);t.classList.contains("Inactive")&&this.setActiveWindow(l),// the top and left css values before dragging window
i=parseInt(t.style.left),n=parseInt(t.style.top),document.addEventListener("mousemove",d),document.addEventListener("mouseup",c.bind(this)),e.preventDefault(),document.removeEventListener("mousedown",this.mouseDown)}let h=(function(e){if((s=e.target).classList.contains("WindowClose")){t=o.findWindowNodeFromChild(s);let e=this.getWindowFromElement(t);this.disposeWindow(e)}document.removeEventListener("mouseup",h)}).bind(this);s.classList.contains("WindowClose")&&document.addEventListener("mouseup",h),s.classList.contains("MemoryButton")&&this.openWindow(new w(this.windows.length+1,4,4)),s.classList.contains("PaintButton")&&this.openWindow(new g(this.windows.length+1)),s.classList.contains("AboutButton")&&this.openWindow(new v(this.windows.length+1))}).bind(this)}/** Starts listener events */waitForAction(){document.addEventListener("mousedown",this.mouseDown)}/** Creates and displays a new window */openWindow(e){this.setActiveWindow(e),this.windows.push(e),this.windowAmount=this.windows.length}/** finds given window object in windows array and deletes it. Also runs the objects function to delete itself from the DOM.
	 *  @param {PwdWindow} window - The window to be deleted
	 */disposeWindow(e){for(let t=0;t<this.windows.length;t++)if(this.windows[t].id===e.id){this.windows.splice(t,1),e.deleteWindow();break;// to not run the loop longer than necessary
}}/** sets a specified window active and makes the curren one inactive
	 * @param {PwdWindow} window - The window to become active
	 */setActiveWindow(e){e.makeActive();let t=0// Z-index of current active window
;this.windows.length>0&&(t=parseInt(this.activeWindow.element.style.zIndex),this.activeWindow.makeInactive()),e.element.style.zIndex=t+1,this.activeWindow=e}/** Returns window object from html element
	 * @param element - The window element
	 */getWindowFromElement(e){let t;let i=e.getAttribute("id");for(let e=0;e<this.windows.length;e++)if(this.windows[e].id===parseInt(i.substring(1))){t=this.windows[e];break}return t}}().waitForAction();//# sourceMappingURL=index.07c91cf7.js.map

//# sourceMappingURL=index.07c91cf7.js.map