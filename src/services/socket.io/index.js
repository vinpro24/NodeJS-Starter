
const SocketConnection = (io) => {
    const { generateId } = io.engine
    io.engine.generateId = (req) => {
        return req._query.id || generateId()
    }

    io.on('connection', (socket) => {
        console.log('Socket connection', socket.id)
        socket.on('disconnecting', () => {
            let rooms = Object.keys(socket.rooms)
            rooms.forEach(room => {
                const sockets = io.getSocketInRoom(room)
                delete sockets[socket.id]
                const data = {
                    type: 'ROOM.STATUS', payload: sockets
                }
                io.in(room).emit('data', { channel: room, data })
            });
            console.log('User Disconnect', socket.id)
        })

        socket.on('subscribe', (room, callback) => {
            socket.join(room)
            const data = {
                type: 'ROOM.STATUS', payload: io.getSocketInRoom(room)
            }
            if (callback) callback(data)
            io.in(room).emit('data', { channel: room, data })
            console.log('joining room', room)
        })

        socket.on('unsubscribe', (room, callback) => {
            if (!room) {
                if (callback) callback('Room name is required.')
            } else {
                socket.leave(room);
                if (callback) callback(null, io.getSocketInRoom(room))
                const data = {
                    type: 'ROOM.STATUS', payload: io.getSocketInRoom(room)
                }
                io.in(room).emit('data', { channel: room, data })
                console.log('leaving room', room)
            }
        })

        socket.on('send', (data, callback) => {
            if (callback) callback()
            console.log(data.room, action.data)
            if (data.room) {
                io.in(data.room).emit('data', action.data)
            }
        })
    })

    io.getSocketById = (user_id) => {
        return io.sockets.sockets[user_id]
    }
    io.getSocketInRoom = (roomName) => {
        if (!io.sockets.adapter.rooms[roomName]) return {}
        return io.sockets.adapter.rooms[roomName].sockets
    }
}

export default SocketConnection

// // sending to the client
// socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

// // sending to all clients except sender
// socket.broadcast.emit('broadcast', 'hello friends!');

// // sending to all clients in 'game' room except sender
// socket.to('game').emit('nice game', "let's play a game");

// // sending to all clients in 'game1' and/or in 'game2' room, except sender
// socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

// // sending to all clients in 'game' room, including sender
// io.in('game').emit('big-announcement', 'the game will start soon');

// // sending to all clients in namespace 'myNamespace', including sender
// io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

// // sending to a specific room in a specific namespace, including sender
// io.of('myNamespace').to('room').emit('event', 'message');

// // sending to individual socketid (private message)
// io.to(`${socketId}`).emit('hey', 'I just met you');

// // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
// // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

// // sending with acknowledgement
// socket.emit('question', 'do you think so?', function (answer) {});

// // sending without compression
// socket.compress(false).emit('uncompressed', "that's rough");

// // sending a message that might be dropped if the client is not ready to receive messages
// socket.volatile.emit('maybe', 'do you really need it?');

// // specifying whether the data to send has binary data
// socket.binary(false).emit('what', 'I have no binaries!');

// // sending to all clients on this node (when using multiple nodes)
// io.local.emit('hi', 'my lovely babies');

// // sending to all connected clients
// io.emit('an event sent to all connected clients');
