import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'development' ? `.env.development` : `.env` })

import http from 'http'
import express from 'express'
import SocketIO from 'socket.io'

import middleware from './services/middleware'
import SocketIOService from './services/socket.io'
import database from './services/database'
import routes from './routes'

const app = express()
const server = http.createServer(app)

app.io = SocketIO(server, {
    cookie: false,
    pingTimeout: 30000,
    pingInterval: 2000,
    serveClient: false
})

server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
    middleware(app)
    SocketIOService(app.io)
    routes(app)
    database()
})