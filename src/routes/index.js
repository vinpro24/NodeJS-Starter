import express from 'express'

import { authJwt } from '../modules/auth/auth.controller'
import authRoutes from '../modules/auth/auth.routes'
import userRoutes from '../modules/user/user.routes'

export default (app) => {
    app.use(express.static('public'))
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/user', authJwt, userRoutes)
}