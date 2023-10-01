# Personal Web Desktop app
This is a personal web desktop app that runs completely in the browser. I made it for an assignment in the course 1DV525 "Introduction to web programming" at the Linneaus University in Växjö. It's a frontend development in vanilla Javascript using Node.js

[Live Demo](https://thordmoller.github.io/personal-web-desktop/)

The desktop contains 3 applications that are opened in their own window when you click their icon. There is no limit to how many windows you can open. The visual design is heavily inspired by the looks of classic windows XP. However it slightly turned into something of its own once i started working on it.

## Upcoming Changes

I'm committed to continually improving this personal web desktop app. Here are some of the upcoming changes and features I have in mind:

### Features

* **Making the in-window-app code structure more modular and dynamic to simplify adding new apps.**
* **Adding an alternate theme that users can choose.**
* **adding multi-user interaction in the Paint app using websockets.**
* **Adding an option to save painted images to the users computer or use them as wallpaper in the web-desktop.**
* **Additional desktop apps**

Please note that this roadmap is subject to change as I receive feedback and explore new ideas. Your input is valuable, so if you have suggestions or feature requests, feel free to open an issue to share your thoughts!

Stay tuned for more updates and improvements to this web desktop app.

## Installation for development
Make sure node.js and npm is installed on your system.

1. `npm install`
2. `npm start`
3. Browse to [http://localhost:1234](http://localhost:1234)

## Assignment requirements
Here are some of the requirements taken from the original assignment page with some added notes by me:
* The application should be a single page application.
* The user shall be able to open multiple windows (not browser windows/tabs but custom windows created using the DOM) within the application.
* The user shall be able to drag and move the windows inside the PWD.
* The user shall be able to open and close new windows of the desired application by clicking or double clicking an icon at the desktop.
* The icon used to open the window should be represented in the upper bar of the window.
* Windows should get focus when clicked/dragged.
* The window with focus shall be on top of all other windows.

### The following three applications should at least be included in the desktop application:
* A memory-game
* A chat connected to a central chat channel using websockets
* One, by you, designed and decided application (Here i decided to make a paint app)

### Non functional requirements PWD:
* A complete git commit history should be present for assessment. For this assignment somewhere between 30 and 200 commits is normal
* The code standard standard.js should be followed. (npm start will show errors if you are not complying)
* All Exported functions, classes and types should be commented. Perferably using JSDoc.
* The application shall be visually appealing
* The code shall be organized in appropriate modules, at least four (4).
*
## The memory game application

See exercise/memory/README.md for a description of this application.
Functional requirements, Memory application:
* The user should be able to open and play multiple memory games simultaneously.
* The user should be able to play the game using only the keyboard.
* One, by you decided, extended feature

## Paint application
One requirement was to come up with my own app to add to the desktop and i decided to do a paint app similar to those in windows. You can change color and brush size

## The chat application (Disabled until i come up with a new server)
The chat application shall be connected to other students chats via a web socket-server.
### The server

The server address is: ws://vhost3.lnu.se:20080/socket/

You connect to the server via web sockets and send messages using the json format:

{
  "type": "message",
  "data" : "The message text is sent using the data property",
  "username": "MyFancyUsername",
  "channel": "my, not so secret, channel",
  "key": "A api-key. Found when logged in on the course webpage"
}

The properties type, data, username and key are mandatory when sending a message to the server. The properties type, data and username will always be present when you receive a message from the server. Additionally, all properties sent from one user will be echoed to all receiving clients.
### The API-key

If you are logged in to coursepress you should be able to see the API-key near the bottom of this page. The key is used to keep track of users of the application and to curb abuse.
### Heartbeat

The web socket server will send a "heartbeat" message to keep the connection open. This message is sent every 40 seconds and have the following structure:

{
  "type": "heartbeat",
  "data" : "",
  "username": "Server"
}

Your application can simply ignore those messages completly.
### Functional requirements, Chat application:
* The user should be able to have several chat applications running at the same time.
* When the user opens the application for the first time the user should be asked to write his/her username.
* The username should remain the same the next time the user starts a chat application or the PWD is restarted.
* The user should be able to send chat messages using a textarea.
* The user should be able to see at least the 20 latest messages since the chat applications was opened.
* One, by you decided, extended feature.

### You are free to add functionality not described above. Added functionality could be:
* Ability to choose which channel to listen to.
* Caching message history.
* Added support for emojis.
* Added support for writing code.
* Ability to change username.
* Encrypted messages on a special channel to allow secret communication.
* Added functionality to the "chat protocol". Discuss with others in the course and agree upon added functionality to add to the sent messages.
* Use the messages to play memory against an opponent. Perferably using a seperate channel.
