"use client"
import { ReactNode } from "react";
import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom}=recoilPersist();

export interface ITasks{
    Title:string,
    mealType:string,
    recipeStatusType?:string
}

export interface IRecipeSave{
     Title:string,
     content:string,
}

export const DayTaskAtom=atom<ITasks[]>({
    key:"DayTaskAtom",
    default:[],
})

export const DayTaskButtonAtom=atom<boolean>({
    key:"DayTaskButtonAtom",
    default:false,
})

export const saveRecipeAtom=atom<IRecipeSave[]>({
   key:"saveRecipeAtom",
   default:[]
})

export const isSidebaropenAtom=atom<boolean>({
    key:"isSidebaropenAtom",
    default:false
})

const getTodayDate=()=>{
    const today=new Date();

    const year=today.getFullYear();
    const month=today.getMonth();
    const day=today.getDay();

    return `${day}-${month}-${year}`
}

export const selectedDateAtom=atom({
    key:"selectedDateAtom",
    default:getTodayDate()
})

export const selectComponentAtom=atom<React.ReactNode>({
    key:"selectComponentAtom",
    default:""
})
