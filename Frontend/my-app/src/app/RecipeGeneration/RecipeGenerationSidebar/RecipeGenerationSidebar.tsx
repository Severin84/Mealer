import React from 'react'
import { FaAnglesLeft } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import "./RecipeGenerationSidebar.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { isSidebaropenSelector, saveRecipeSelector } from '../../../../store/Selectors/Mess/MessSelectorStore';
import { isSidebaropenAtom } from '../../../../store/Atoms/Mess/MessAtomStore';
import { FaAnglesRight } from "react-icons/fa6";
import { HiOutlinePencilAlt } from "react-icons/hi";
const RecipeGenerationSidebar = () => {

  const savedItems=useRecoilValue(saveRecipeSelector);
  const [sideBarOpen,setSideBarOpen]=useRecoilState(isSidebaropenAtom);
  const isSideBarOpen=useRecoilValue(isSidebaropenSelector);

  const toggleSideBar=()=>{
    setSideBarOpen(!sideBarOpen);
  }

  return (
    <div className={isSideBarOpen===false?'RecipeSidebar':'shrinkedRecipeSidebar'}>
        <div className={isSideBarOpen===false?'RecipeSidebar-top-Content':'shrinkedRecipeSidebar-top-Content'}>
        <div className={isSideBarOpen===false?'RecipeBar-close':'shrinkedRecipeBar-close'}>{isSideBarOpen===false?<FaAnglesLeft onClick={()=>toggleSideBar()}/>:<FaAnglesRight onClick={()=>toggleSideBar()}/>}</div>
        <div className={isSideBarOpen===false?'RecipeBar-profile':'shrinkedRecipeBar-profile'}><CgProfile /></div>
        </div>
        <div className='RecipeSidebar-mid-Content'>
          <div className='savedTitles'>
            {
              savedItems.map((value,index)=>(
                <div key={index} className='savedTitleDiv'>
                    <span className='savedTitle'>{isSideBarOpen===false?value.Title:<HiOutlinePencilAlt />}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className={isSideBarOpen===false?'RecipeSidebar-lower-Content':'shrinkedRecipeSidebar-lower-Content'}><div className={isSideBarOpen===false?'RecipeSidebar-setting':'shrinkedRecipeSidebar-setting'}><IoIosSettings /></div></div>
    </div>
  )
}


export default RecipeGenerationSidebar