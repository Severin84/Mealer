import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";

const prisma=new PrismaClient();

const createRecipe=async(req:Request,res:Response)=>{
   try{
      const {userID,DayID,mealID,generateType,contents,Title} = req.body;
      
      if(!userID||!DayID||!mealID||!generateType){
         return res.send(404).json({message:"Insufficient Data"});
      }

      const user = await prisma.user.findFirst({
        where:{
            id:parseInt(userID)
        }
      })

      if(!user){
         return res.send(404).json({message:"User not found"})
      }

      const day= await prisma.day.findFirst({
        where:{
            id:parseInt(DayID)
        }
      });

      if(!day){
         return res.json(404).json({message:"day not found"})
      }

      const mealTime=await prisma.breakfastData.findFirst({
        where:{
            id:parseInt(mealID)
        }
      })

      if(!mealTime){
         return res.status(404).json({message:"This meal has not been created yet"})
      }

      if(Title){
        const updatecontents=await prisma.breakfastData.update({
            where:{
                id:parseInt(mealID)
            },
            data:{
                Title:Title
            }
        })
      }

      if(contents){
        const updatecontents=await prisma.breakfastData.update({
            where:{
                id:parseInt(mealID)
            },
            data:{
                contents:contents
            }
        })
      }
      
    
      res.status(200).json({message:"The recipe has been updated"})

   }catch(error){
      res.status(401).json({message:"Something went wrong while creating the Recipe"})
   }
}


export default createRecipe