"use client"
import React from 'react'
import "./Dashboard-Mess.css"
import DayPicker from '../DayPicker/DayPicker';
import DayPlanner from '../DayPlanner/DayPlanner';
import Dashboard_Mess_sidebar from './dashboard-Mess-sidebar/Dashboard_Mess_sidebar';
import { useRecoilValue } from 'recoil';
import { isSidebaropenSelector, selectComponentSelector } from '../../../store/Selectors/Mess/MessSelectorStore';

const DashBoardMess = () => {
  const isSideBarOpen=useRecoilValue(isSidebaropenSelector);
  const comp=useRecoilValue(selectComponentSelector);
  return (
    <div className='MessDashboard'>
        <div className={isSideBarOpen===false?'MessDashboard-asideDiv':'shrinkedMessDashboard-asideDiv'}>
            <aside className='MessDashboard-aside'><Dashboard_Mess_sidebar/></aside>
        </div> 
        <div className={isSideBarOpen===false?'MessDashboard-MainDiv':'shrinkedMessDashboard-MainDiv'} >
            {comp}
        </div>
    </div>
  )
}

export default DashBoardMess