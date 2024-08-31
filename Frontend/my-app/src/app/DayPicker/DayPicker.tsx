"use client"
import React, { useEffect, useState } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./DayPicker.css";
import { useRecoilState } from 'recoil';
import { selectedDateAtom } from '../../../store/Atoms/Mess/MessAtomStore';

type ValuePiece=Date | null;

type Value=ValuePiece | [ValuePiece,ValuePiece];
const DayPicker = () => {
  const [value,onChange]=useState<Value>(new Date());
  const [task,setTask]=useRecoilState(selectedDateAtom);  

  const dateChanged=()=>{
      let month=value?.toString().split(" ")[1];
      let date=value?.toString().split(" ")[2];
      let year=value?.toString().split(" ")[3];
      
      setTask(`${date}-${month}-${year}`);
  }

  useEffect(()=>{
    dateChanged();
  },[value])

  console.log(value)
  return (
    <div className='CalenderComp'>
    <div className='CalenderComp-Div'>
      <Calendar className="calendar"  onChange={onChange} value={value}/>
    </div>
    </div>
  )
}

export default DayPicker