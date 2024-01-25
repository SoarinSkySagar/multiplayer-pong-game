let ready = 0

function listen(io) {
    const pongNamespace = io.of('/pong')
    // const tetrisNamespace = io.of('/tetris')
    pongNamespace.on('connection', (socket) => {
        let room

        console.log('User', socket.id, 'connected!')
        
        socket.on('ready', () => {
            room = 'room' + Math.floor(ready / 2)
            socket.join(room)
            ready++
            console.log(ready, 'players ready for ', room)

            if (ready % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        })
        socket.on('paddleMove', (data) => {
            socket.to(room).emit('paddleMove', data)
        })

        socket.on('ballMove', (data) => {
            socket.to(room).emit('ballMove', data)
        })

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`)
            socket.leave(room)
        })
    })
}

module.exports = {
    listen
}