import React from 'react'
import "./Dashboard-Mess.css"
const DashBoardMess = () => {
  return (
    <div className='MessDashboard'>
        <div className='MessDashboard-asideDiv'>
            <aside className='MessDashboard-aside'></aside>
        </div>
        <div className='MessDashboard-MainDiv'>
            {/* <div className='MessDashboard-MainBox'></div> */}
            <div className='MessDashboard-HeadingDiv'>
              <div>Day Title</div>
              <div>Add Button</div>
            </div>
            <div className='MessDashboard-ContentDiv'></div>
        </div>
    </div>
  )
}

export default DashBoardMess