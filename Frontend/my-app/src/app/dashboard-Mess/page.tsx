"use client"
import React from 'react'
import "./Dashboard-Mess.css"
import DayPicker from '../DayPicker/DayPicker';
import DayPlanner from '../DayPlanner/DayPlanner';

const DashBoardMess = () => {

  return (
    <div className='MessDashboard'>
        <div className='MessDashboard-asideDiv'>
            <aside className='MessDashboard-aside'></aside>
        </div> 
        <div className='MessDashboard-MainDiv' >
            {/* <DayPicker/> */}
            <DayPlanner/>
        </div>
    </div>
  )
}

export default DashBoardMess