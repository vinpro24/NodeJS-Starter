import express from 'express'

import * as controller from './auth.controller'

const router = new express.Router()

router.get('/check', controller.authJwt, controller.check)


export default router
