import { createContext, useEffect, useState} from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { use } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const navigate = useNavigate()

    const{getToken} = useAuth()
    const {user} = useUser()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    // Fetch all Course
    const fetchAllCourses = async()=>{
        setAllCourses(dummyCourses)
    }

    // tính toán rating

    const calculateRating = (course) =>{
        if(course.courseRatings.length === 0){
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length

    }


    // TInh1 toán chapter
    const calculateChapterTime = (chapter) =>{
        let time = 0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ['h','m']})
    }

    // thời lượng course
    const calculateCourseDuration = (course) =>{
        let time = 0
        course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration))

        return humanizeDuration(time * 60 * 1000, {units: ['h','m']})

    }

    // tinh toan ko co course
    const calculateNoOfLectures = (course) =>{ 
        let totalLectures = 0;
        course.courseContent.forEach(chapter => { 
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }

    // Fetch ng dùng đăng ký
    const fetchUserEnrolledCourses =async () => {
        setEnrolledCourses(dummyCourses)
    }


    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[])

    const logToken = async () => {
        console.log(await getToken());
        
    }

    useEffect(()=>{
        if(user){
            logToken()
        }
    },[user])

    const value = {
        allCourses, navigate, calculateRating, isEducator, setIsEducator, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime,enrolledCourses, setEnrolledCourses, fetchUserEnrolledCourses
        
    }


    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}