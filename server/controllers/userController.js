import Course from "../models/Course.js";
import User from "../models/User.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "Không Tìm Thấy User" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// users đăng ký khóa học có link bài học
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const userData = await User.findById(userId).populate('enrolledCourses')

        res.json({ success: true, enrolledCourses: userData.enrolledCourses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Update User Khóa Học độ hoàn thành
export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId, lectureId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (!progressData) {
            if(!progressData.lectureCompleted.includes(lectureId)){
                return res.json({success: true, message: 'Bài Học Đã Hoàn Thành'})
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()

        }else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })

        }

        res.json({ success: true, message: 'Cập Nhật Thành Công' })

    } catch (error) {
        res.json({ success: false, message: error.message })
        
    }
}


//Lấy độ hoàn thành bài học của user

export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })
        res.json({ success: true, progressData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    
    }
}

//Đánh giá Bài Học

export const addUserRating = async (req, res) => {
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if(!courseId || !userId || !rating || rating < 1 || rating > 5){
        return res.json({success: false, message: 'Thông Tin Không Hợp Lệ'})
    }

    try {
        const course = await Course.findById(courseId);
        
        if(!course){
            return res.json({success: false, message: 'Khóa Học Không Tồn Tại'})
        }

        const user = await User.findById(userId);
        if(!user || !user.enrolledCourses.includes(courseId)){
            return res.json({success: false, message: 'Người Dùng Không Tồn Tại'});
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

        if(existingRatingIndex > -1){
            course.courseRatings[existingRatingIndex].rating = rating;
        }else{
            course.courseRatings.push({userId, rating});
        
        }

        await course.save();
        res.json({success: true, message: 'Đánh Giá Thành Công'})

        

        
    } catch (error) {
        return res.json({success: false, message: error.message})
    
    }
    
}