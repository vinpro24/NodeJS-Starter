import express from 'express'
import * as controller from './user.controller'

const router = express.Router()

router.get('/', controller.getUsers)
router.get('/:id', controller.getUser)
router.put('/:id', controller.updateInfo)
router.delete('/:id', controller.deleteUser)

export default router
