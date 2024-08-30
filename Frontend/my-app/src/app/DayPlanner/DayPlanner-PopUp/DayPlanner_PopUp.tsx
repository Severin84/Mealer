"use client"
import React, { useState } from 'react'
import "./DayPlanner_PopUp.css";
import {Input} from "@/components/ui/input"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';
import { DayTaskAtom, DayTaskButtonAtom } from '../../../../store/Atoms/Mess/MessAtomStore';
import { RxCrossCircled } from "react-icons/rx";

const DayPlanner_PopUp = () => {
  const [title,setTitle]=useState<string>("");
  const [mealType,setMealType]=useState<string>("");
  const [recipeStatusType,setRecipeStatusType]=useState<string>(""); 
  const [task,setTask]=useRecoilState(DayTaskAtom);
  const [isPortalOpen,setPortalOpen]=useRecoilState(DayTaskButtonAtom);

  const handleMealType=(value:string)=>{
     setMealType(value)
  }

  const handleRecipeStatusType=(value:string)=>{
    setRecipeStatusType(value)
 }

 const handleArray=()=>{
    setTask([...task,{Title:title,mealType:mealType,recipeStatusType:recipeStatusType}])
 }

 const handleClose=()=>{
     setPortalOpen(!isPortalOpen);
 }


  return (
    <div className="DayPlanner_PopUp_Div">
      <div>
        <RxCrossCircled  onClick={()=>handleClose()}/>
      </div>
       <div className='DayPlanner_PopUp_Input'>
       <Input style={{width:"20rem"}} placeholder='Title' onChange={(event)=>setTitle(event.target.value)}/>
       </div>
       <div className='DayPlanner_PopUp_DropDowns'>
        <div className='DayPlanner_PopUp_MealType_DropDown'>
          <DropdownMenu >
            <DropdownMenuTrigger className='Meal_Type'>Meal Type</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={()=>handleMealType("BreakFast")}>BreakFast</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>handleMealType("Lunch")}>Lunch</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>handleMealType("Dinner")}>Dinner</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='DayPlanner_PopUp_Recipe_DropDown'>
          <DropdownMenu>
            <DropdownMenuTrigger className='Recipe'>Recipe ?</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={()=>handleRecipeStatusType("Want to Generate the Recipe ?")}>Want to Generate the Recipe ?</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>handleRecipeStatusType("Know the Recipe ?")}>Know the Recipe ?</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>handleRecipeStatusType("Know the Recipe and want to save ?")}>Know the Recipe and want to save ?</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
       </div>
       <div className='DayPlanner_PopUp_SubmitButton'>
        <Button value={"HEllo"} onClick={()=>handleArray()}/>
       </div>
    </div>
  )
}

export default DayPlanner_PopUp