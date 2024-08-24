"use client"
import React,{useEffect,useState,ChangeEvent} from 'react'
import "./RecipeGeneration.css";
import Generator from './Generator/Generator';
import { useSearchParams } from 'next/navigation';
const RecipeGeneration = () => {
   interface Imessage{
        message:string,
        sender:boolean,
    }
  
  const [generationInProgress,setGenerationInProgress]=useState<boolean>(false)
  const [input,setInput]=useState<string>("");
  const [messages,setMessages]=useState<Array<Imessage>>([]);
  const [userClicked,setUserClicked]=useState<boolean>(false)

  const bottonClicked=async()=>{
    setGenerationInProgress(true)
     let newObj:Imessage={
        message:input,
        sender:true
     };
     addNewMessage(newObj)
     generateRecipe()
  }

  const addNewMessage=(obj:Imessage)=>{
     let newArray=[];
     for(let i=0;i<messages.length;i++){
         newArray.push(messages[i]);
     }
     newArray.push(obj);
     setMessages(newArray);
  }


  const generateRecipe=async()=>{
     setGenerationInProgress(true);
     let recipe=await Generator(input);
     if(recipe){
        let newObj:Imessage={
            message:recipe,
            sender:false
        }
        addNewMessage(newObj);
     }
  }

  const takeInput=(event:ChangeEvent<HTMLTextAreaElement>)=>{
     setInput(event.target.value);
  }


console.log(messages)
  return (
    <div className='RecipePage'>
        <div className='RecipePage-asideDiv'></div>
        <div className='RecipePage-MainDiv'>
            <div className='RecipePage-MainDiv-Binder'>
                <div className='RecipePage-MainDiv-Content'>
                    <div className='RecipePage-MainDiv-Content-Messages'>
                     {
                        messages.map((value,index)=>(
                            <div style={{whiteSpace:"pre-wrap"}} className='RecipePage-MainDiv-Content-Messages-ClientDiv'>
                                <span  className={`RecipePage-MainDiv-Content-Messages-Client-${value.sender}`}>{value.message}</span>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecipeGeneration