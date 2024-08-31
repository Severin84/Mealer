import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { FaPenToSquare } from "react-icons/fa6";
import { BiSolidBookBookmark } from "react-icons/bi";
import "./Dashboard_Mess_sidebar.css"
import { useRecoilState, useRecoilValue } from 'recoil';
import { isSidebaropenSelector } from '../../../../store/Selectors/Mess/MessSelectorStore';
import { isSidebaropenAtom, selectComponentAtom } from '../../../../store/Atoms/Mess/MessAtomStore';
import DayPicker from '@/app/DayPicker/DayPicker';
import DayPlanner from '@/app/DayPlanner/DayPlanner';
import SavedRecipe from '@/app/savedRecipe/SavedRecipe';
import { useRouter } from 'next/navigation';


const Dashboard_Mess_sidebar = () => {
  const router = useRouter();
  const isSideBarOpen=useRecoilValue(isSidebaropenSelector);
  const [sideBarOpen,setSideBarOpen]=useRecoilState(isSidebaropenAtom);
  const [selectComp,setSelectComp]=useRecoilState(selectComponentAtom);

  const toggleSideBar=()=>{
    setSideBarOpen(!sideBarOpen);
  }

  const changeComponent=(comp:React.ReactNode)=>{
     setSelectComp(comp);
  }

  const gotoRecipe=()=>{
     router.push('/RecipeGeneration')
  }

  return (
    <div className={isSideBarOpen===false?'MessSidebar':'shrinkedMessSidebar'}>
      <div className={isSideBarOpen===false?'MessSidebar-top-Content':'shrinkedMessSidebar-top-Content'}>
        <div className={isSideBarOpen===false?'MessBar-close':'shrinkedMessBar-close'}>{isSideBarOpen===false?<FaAnglesLeft onClick={()=>toggleSideBar()}/>:<FaAnglesRight onClick={()=>toggleSideBar()}/>}</div>
        <div className={isSideBarOpen===false?'Mess-profile':'shrinkedMessBar-profile'}><CgProfile /></div>
      </div>
      <div className={isSideBarOpen===false?'MessBar-content':'shrinkedMessBar-content'}>
        <div onClick={()=>gotoRecipe()} className={isSideBarOpen===false?'MessBar-content-calendar':'shrinkedMessBar-content-calendar'}>{isSideBarOpen===false?<div className='calenderBinder'><span>Recipe</span><FaPenToSquare style={{marginLeft:"0.6rem",marginTop:"0.3rem",marginRight:"0.5rem"}} /></div>:<div className='shrinkedcalender'><FaPenToSquare   style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}/></div>}</div>
        <div onClick={()=>changeComponent(<DayPicker/>)} className={isSideBarOpen===false?'MessBar-content-calendar':'shrinkedMessBar-content-calendar'}>{isSideBarOpen===false?<div className='calenderBinder'><span>Calender</span><FaCalendarAlt style={{marginLeft:"0.6rem",marginTop:"0.3rem",marginRight:"0.5rem"}} /></div>:<div className='shrinkedcalender'><FaCalendarAlt  style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}/></div>}</div>
        <div onClick={()=>changeComponent(<DayPlanner/>)} className={isSideBarOpen===false?'MessBar-content-schedule':'shrinkedMessBar-content-schedule'}>{isSideBarOpen===false?<div className='scheduleBinder'><span>Schedule</span><AiFillSchedule style={{marginLeft:"0.6rem",marginTop:"0.3rem",marginRight:"0.5rem"}}/></div>:<div  className='shrinkedschedule'><AiFillSchedule style={{marginTop:"0.3rem",marginBottom:"0.2rem"}}/></div>}</div>
        <div onClick={()=>changeComponent(<SavedRecipe/>)} className={isSideBarOpen===false?'MessBar-content-bookmark':'shrinkedMessBar-content-bookmark'}>{isSideBarOpen===false?<div className='saveBinder'><span>Saved</span><BiSolidBookBookmark style={{marginLeft:"0.6rem",marginTop:"0.3rem",marginRight:"0.5rem"}}/></div>:<div  className='shrinkedbookmarked'><BiSolidBookBookmark style={{marginTop:"0.3rem",marginBottom:"0.2rem"}}/></div>}</div>
      </div>
      <div className={isSideBarOpen===false?'MessBar-lower-content':'shrinkedMessBar-lower-content'}><div className={isSideBarOpen===false?'messbar-setting':'shrinkedmessbar-setting'}><IoIosSettings /></div></div>
    </div>
  )
}

export default Dashboard_Mess_sidebar