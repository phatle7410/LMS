import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../compoments/educator/Navbar.jsx'
import Sidebar from '../../compoments/educator/Sidebar.jsx'
import Footer from '../../compoments/educator/Footer.jsx'


const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1'>
            {<Outlet/>}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Educator
