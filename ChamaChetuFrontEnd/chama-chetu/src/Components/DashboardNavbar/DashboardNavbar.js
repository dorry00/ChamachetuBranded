import React from 'react'
import "./DashboardNavbar.css"
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function DashboardNavbar() {
  return (
    <div className='DashboardNavbar'>
      <div className='wrapper'>
        <div className='items'>
         <div className='item'>
           <ChatBubbleOutlineOutlinedIcon/>
         </div>
         <div className='item'>
           <ChatBubbleOutlineOutlinedIcon/>
         </div>
         <div className='item'>
          <DarkModeOutlinedIcon/>
         </div>
         <div className='item'>
        <NotificationsOutlinedIcon/>
         </div>
        </div>
      </div>


    </div>
  )
}

export default DashboardNavbar