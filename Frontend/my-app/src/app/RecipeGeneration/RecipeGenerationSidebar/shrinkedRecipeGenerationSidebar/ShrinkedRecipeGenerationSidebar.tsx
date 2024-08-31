import React from 'react'
import { FaAnglesRight } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import "./ShrinkedRecipeGenerationSidebar.css"

const ShrinkedRecipeGenerationSidebar = () => {
  return (
    <div>
        <div>
        <div><FaAnglesRight /></div>
        <div><CgProfile /></div>
        </div>
        <div></div>
        <div><IoIosSettings /></div>
    </div>
  )
}

export default ShrinkedRecipeGenerationSidebar