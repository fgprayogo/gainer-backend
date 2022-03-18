import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  // socket.emit('news', { hello: 'world' })
  // console.log("connected")

  // socket.on('greetings', (data) => {
  //   console.log(data)
  //   Ws.io.emit("message", data)
  // })
})
