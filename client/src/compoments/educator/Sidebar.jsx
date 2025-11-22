import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext.jsx'
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

  const { isEducator } = useContext(AppContext);

  const menuItems =[
    {name: 'Trang Tổng Quan', path: '/educator', icon: assets.home_icon},
    {name: 'Thêm Khóa Học', path: '/educator/add-course', icon: assets.add_icon},
    {name: 'Khóa Học Của Tôi', path: '/educator/my-courses', icon: assets.my_course_icon},
    {name: 'Số Lượng Học Sinh', path: '/educator/student-enrolled', icon: assets.person_tick_icon},
  ];

  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuItems.map((item) => (
        <NavLink
        to={item.path}
        key={item.name}
        end={item.path === '/educator'}
        className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
        >
          <img src={item.icon} alt="" className='w-6 h-6' />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
