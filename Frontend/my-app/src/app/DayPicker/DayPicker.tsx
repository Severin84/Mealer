"use client"
import React from 'react'
import {Calendar} from "@/components/ui/calendar"
import "./DayPicker.css"
const DayPicker = () => {
  const handleSelect=(date:any)=>{
    console.log(date)
  }
  return (
    <div className='CalenderComp'>
    <div className='CalenderComp-Div'>
      <Calendar  className="w-inherit h-inherit" mode='single' onSelect={handleSelect}/>
    </div>
    </div>
  )
}

export default DayPicker