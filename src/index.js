import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV ? `${process.cwd()}/.env.development` : `${process.cwd()}/.env` })

import http from 'http'
import express from 'express'

import middleware from './services/middleware'
import socketio from './services/socket.io'
import database from './services/database'
import routes from './routes'

const app = express()

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
    middleware(app)
    socketio(app)
    routes(app)
    database()
})