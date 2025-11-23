import { clerkClient} from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary} from 'cloudinary';
import User from "../models/User.js";



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

// Lấy Khóa Học Của Người Dạy

export const getEducatorCourses = async (req, res)=> {
    try {
        const educator = req.auth.userId

        const courses = await Course.find({educator})
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// lấy data dashboard của educator(enrolled students, total courses)

export const educatorDashboardData = async () => {
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);

// thu thập tất cả học sinh đã đăng ký từ các khóa học của người dạy
        const enrolledStudentsData = [];
        for(const course of courses){
            const students = await User.find({
                 _id: { $in: course.enrolledStudents } 
                }, 'name imageUrl');

                students.forEach(student => {
                    enrolledStudentsData.push({
                        courseTitle: course.courseTitle,
                        student
                    })
                });
        }

        res.json({ success: true, dashboardData: {
            enrolledStudentsData, totalCourses
        } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//