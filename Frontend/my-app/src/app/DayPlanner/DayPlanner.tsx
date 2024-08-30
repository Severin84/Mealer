"use client"
import React,{useState} from 'react'
import "./DayPlanner.css"
import DayPlanner_PopUp from './DayPlanner-PopUp/DayPlanner_PopUp'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DayTaskButtonSelector, DayTaskSelector } from '../../../store/Selectors/Mess/MessSelectorStore'
import { DayTaskAtom, DayTaskButtonAtom } from '../../../store/Atoms/Mess/MessAtomStore'
import { FaTrash } from "react-icons/fa";

const DayPlanner = () => {
  interface IcheckBox{
     message:string,
     status:boolean
  }

  const [title,setTitle]=useState<string>("");
  const [mealType,setMealType]=useState<string>("");
  const [checkbox,setCheckbox]=useState<Array<IcheckBox>>([{message:"Want to Generate the Recipe ?",status:false},{message:"Know the Recipe ?",status:false},{message:"Know the Recipe and want to save ?",status:false}]);
  const [addItem,setAddItem]=useState<boolean>(false);
  const Tasks=useRecoilValue(DayTaskSelector);
  const shouldopenpopup=useRecoilValue(DayTaskButtonSelector);
  const [isPortalOpen,setPortalOpen]=useRecoilState(DayTaskButtonAtom);
  const [task,setTask]=useRecoilState(DayTaskAtom);
 
  
  const buttonClicked=()=>{
      setPortalOpen(!isPortalOpen)
  }

  const handleTaskDelete=(value:string)=>{
    const newArray=task.filter((data)=>data.Title!==value);
    setTask(newArray);
  }


  return (
    <div>
        <div className='MessDashboard-HeadingDiv'>
            <div className='MessDashboard-Heading-Date-Title-Div'>
              <div className='MessDashboard-Heading-Date-Title'>Date Title</div>
            </div>
            <div className='MessDashboard-Heading-Add-Button-Div'>
              <div className='MessDashboard-Heading-Add-Button' ><button onClick={buttonClicked}>Add Button</button></div>
            </div>
        </div>
        <div className='MessDashboard-ContentDiv'>
           <div className='MessDashboard-Content'>
             {
               Tasks && Tasks.map((value,idx)=>(
                   <div key={idx} className='MessDashboard-card'>
                      <div className='ItemTitle'>
                         <span>{value?.Title}</span>
                      </div>
                      <div className='ItemUtils'>
                        <div className='mealType'>
                           <span>{value?.mealType}</span>
                        </div>
                        <div className='recipeStatue'>
                           <span>{value?.recipeStatusType}</span>
                        </div>
                      </div>
                      <div className='cardTrash'>
                           <FaTrash onClick={()=>handleTaskDelete(value.Title)}/>
                        </div>
                   </div>
               ))
             }
           </div>
        </div>
        { shouldopenpopup && <div className='DayPlanner_Pop' style={{position:"relative",marginTop:"-35rem",marginLeft:"25rem"}}><DayPlanner_PopUp /></div>}
    </div>
  )
}

export default DayPlanner