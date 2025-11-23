import Course from "../models/Course.js";
import User from "../models/User.js";
//Lấy Hết Khóa Học

export const getAllCourse = async (req, res)=> {
    try {
        const courses = await Course.find({isPublished: true}).select(['-courseContent', '-enrolledStudents']).populate({path: 'educator'})

        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Lấy Chi Tiết Khóa Học id
export const getCourseId = async (req,res)=>{
    const {id} = req.params

    try {
        const courseData = await Course.findById(id).populate({path: 'educator'})

        res.json({ success: true, courseData })
    }catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// Enroll user vào khóa học
export const enrolledCourse = async (req, res) => {
  const { id } = req.params; // courseId
  const userId = req.auth.userId;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 1️⃣ Thêm user vào course.enrolledStudents
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    // 2️⃣ Thêm course vào user.enrolledCourses
    if (!user.enrolledCourses.includes(id)) {
      user.enrolledCourses.push(id);
      await user.save();
    }

    res.json({ success: true, message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
