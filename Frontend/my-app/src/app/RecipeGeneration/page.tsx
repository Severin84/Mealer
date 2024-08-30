"use client"
import React,{useEffect,useState,ChangeEvent} from 'react'
import "./RecipeGeneration.css";
import Generator from './Generator/Generator';
import { useSearchParams } from 'next/navigation';
import { FaBookmark } from "react-icons/fa6";
import RecipeGenerationSidebar from './RecipeGenerationSidebar/RecipeGenerationSidebar';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IRecipeSave, saveRecipeAtom } from '../../../store/Atoms/Mess/MessAtomStore';

const RecipeGeneration = () => {
   interface Imessage{
        message:string,
        sender:boolean,
    }
  
  const [generationInProgress,setGenerationInProgress]=useState<boolean>(false)
  const [input,setInput]=useState<string>("");
  const [messages,setMessages]=useState<Array<Imessage>>([]);
  const [userClicked,setUserClicked]=useState<boolean>(false)
  const [saveRecipe,setSaveRecipe]=useRecoilState(saveRecipeAtom);
  const [title,setTitle]=useState<string>("");
  const [saveTitleopen,setSaveTitleopen]=useState<boolean>(false);
  const [newRecipeToSave,setNewRecipeToSave]=useState<IRecipeSave>();
  const [Content,setContent]=useState<string>("");
  const bottonClicked=async()=>{
    setGenerationInProgress(true)
     let newObj:Imessage={
        message:input,
        sender:true
     };
     setMessages(prv=>[...prv,newObj]);
     generateRecipe()
  }


  const generateRecipe=async()=>{
     setGenerationInProgress(true);
     let recipe=await Generator(input);
     if(recipe){
        let newObj:Imessage={
            message:recipe,
            sender:false
        }
       setMessages(prv=>[...prv,newObj]);
     }
  }

  const takeInput=(event:ChangeEvent<HTMLTextAreaElement>)=>{
     setInput(event.target.value);
  }

  const handleRecipeSave=(value:string)=>{
     setSaveTitleopen(!saveTitleopen);
     setContent(value);
  }

  const saveRecipeData=()=>{
    if(newRecipeToSave){
        setSaveRecipe((prv)=>[...prv,newRecipeToSave]);
        setSaveTitleopen(!saveTitleopen);
    }
  }
  

  const TitleChange=(value:string)=>{
    let newObj={
        Title:value,
        content:Content
     }

     setNewRecipeToSave(newObj);
  }
useEffect(()=>{

},[saveTitleopen])


  return (
    <>
    <div className='RecipePage'>
        <div className='RecipePage-asideDiv'>
            <RecipeGenerationSidebar/>
        </div>
        <div className='RecipePage-MainDiv'>
            <div className='RecipePage-MainDiv-Binder'>
                <div className='RecipePage-MainDiv-Content'>
                    <div className={messages.length<=1?"RecipePage-MainDiv-Content-Message":"RecipePage-MainDiv-Content-Messages"}>
                     {
                        messages.map((value,index)=>(
                            <div key={index} style={{whiteSpace:"pre-wrap"}} className={`RecipePage-MainDiv-Content-Messages-ClientDiv-${value.sender}`}>
                                <span className={`RecipePage-MainDiv-Content-Messages-Client-${value.sender}`}>{value.message}</span>
                               {value.sender===false && <div><FaBookmark onClick={()=>handleRecipeSave(value.message)}/></div>}
                            </div>
                        ))
                     }
                    </div>
                </div>
                <div className='RecipePage-MainDiv-Input'>
                    <div className='RecipePage-MainDiv-Input-Binder'>
                        <div className='RecipePage-MainDiv-Input-textarea'>
                            <textarea cols={110} rows={3} onChange={takeInput} />
                        </div>
                        <div className='RecipePage-MainDiv-Input-Button'>
                            <button onClick={bottonClicked}>Go!</button>
                        </div>
                        {/* <div className='Recipe-bookmark'><FaBookmark style={{fontSize:"2rem"}}/></div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {saveTitleopen && 
    <div className='saveRecipeTitleDiv'>
        <div className='saveRecipeTitle'>
            <span>Title:</span>
            <input placeholder='Title' onChange={(event)=>TitleChange(event.target.value)}/>
            <button onClick={()=>saveRecipeData()}>Save</button>
        </div>
    </div>}
    </>
  )
}

export default RecipeGeneration