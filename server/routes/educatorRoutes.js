import express from 'express'
import { updateRoleToEducator } from '../controllers/educatorController.js'

const educatorRouter = express.Router()

//thêm role ng dạy

educatorRouter.get('/update-role', updateRoleToEducator)

export default educatorRouter;