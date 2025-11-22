import React from 'react'
import Hero from '../../compoments/student/Hero'
import Companies from '../../compoments/student/Companies'
import CoursesSection from '../../compoments/student/CoursesSection'
import TestimonialsSection from '../../compoments/student/TestimonialsSection'
import CallToAction from '../../compoments/student/CallToAction'
import Footer from '../../compoments/student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home
