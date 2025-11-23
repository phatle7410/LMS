import express from 'express'
import { addCourse,educatorDashboardData,getEducatorCourses,updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import { getEnrolledStudents } from '../controllers/educatorController.js'

const educatorRouter = express.Router()

//thêm role ng dạy

educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudents)


export default educatorRouter;