import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary} from 'cloudinary';


//update thành người dạy
export const updateRoleToEducator = async (req, res)=> {
    try{
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator',
            }
        })

        res.json({ success: true, message: 'Bạn Đã Có Thể Đăng Khóa Học Của Mình'})

    }catch(error){
        res.json({ success: false, message: error.message})
    }
}

// Thêm New Course
export const addCourse = async (req, res)=> {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'Thumbnail chưa được thêm.' })
        }

        const parsedCourseData = await JSON.parse(courseData);
        parsedCourseData.educator = educatorId;
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({ success: true, message: 'Khóa Học Mới Được Tạo Thành Công'})


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}