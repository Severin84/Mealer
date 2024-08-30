import React from 'react'
import { FaAnglesLeft } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import "./RecipeGenerationSidebar.css";
import { useRecoilValue } from 'recoil';
import { saveRecipeSelector } from '../../../../store/Selectors/Mess/MessSelectorStore';

const RecipeGenerationSidebar = () => {
  const savedItems=useRecoilValue(saveRecipeSelector);

  return (
    <div className='RecipeSidebar'>
        <div className='RecipeSidebar-top-Content'>
        <div className='RecipeBar-close'><FaAnglesLeft /></div>
        <div className='RecipeBar-profile'><CgProfile /></div>
        </div>
        <div className='RecipeSidebar-mid-Content'>
          <div className='savedTitles'>
            {
              savedItems.map((value,index)=>(
                <div className='savedTitleDiv'>
                    <span className='savedTitle'>{value.Title}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='RecipeSidebar-lower-Content'><div className='RecipeSidebar-setting'><IoIosSettings /></div></div>
    </div>
  )
}


export default RecipeGenerationSidebar