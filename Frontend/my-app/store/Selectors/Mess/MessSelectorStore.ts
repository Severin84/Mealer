"use client"
import {selector} from "recoil";
import {DayTaskAtom, DayTaskButtonAtom, isSidebaropenAtom, saveRecipeAtom, selectComponentAtom, selectedDateAtom} from "../../Atoms/Mess/MessAtomStore";

export const DayTaskSelector=selector({
    key:"DayTaskSelector",
    get:({get})=>{
        const state=get(DayTaskAtom);

        return state;
    }
})


export const DayTaskButtonSelector=selector({
    key:"DayTaskButtonSelector",
    get:({get})=>{
        const state=get(DayTaskButtonAtom);

        return state;
    }
})

export const saveRecipeSelector=selector({
    key:"saveRecipeSelector",
    get:({get})=>{
        const state=get(saveRecipeAtom);

        return state;
    }
})

export const isSidebaropenSelector=selector({
    key:"isSidebaropenSelector",
    get:({get})=>{
         const state=get(isSidebaropenAtom);

         return state
    }
})

export const selectedDateSelector=selector({
    key:"selectedDateSelector",
    get:({get})=>{
        const state=get(selectedDateAtom);

        return state;
    }
})

export const selectComponentSelector=selector({
    key:"selectComponentSelector",
    get:({get})=>{
        const state=get(selectComponentAtom);

        return state;
    }
})
