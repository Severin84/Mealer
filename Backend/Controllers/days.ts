import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client"

const prisma=new PrismaClient();

const createMeal=async(req:Request,res:Response)=>{
    try{
       
       const {day,authorID}=req.body
       console.log(req.body)
       if(!day||!authorID){
          return res.send(404).json({message:"Insufficient data"})
       }
    
       const isUser=await prisma.user.findUnique({
        where:{
            id:parseInt(authorID)
        }
       })

       if(!isUser){
          return res.status(401).json({message:"User does not exist"});
       }

       const newDay=await prisma.day.create({
         data:{
            day:day,authorID:parseInt(authorID),Breakfasts:{create:[]},Lunchs:{create:[]},Dinners:{create:[]}
         }
       })

       res.status(200).json({message:"The Day is created"});
    }catch(error){
        res.status(400).json({message:error})
    }
}

const createBreakfast=async(req:Request,res:Response)=>{
    try{
      
      const {Title,contents,authorID,MealType}=req.body;
      
      if(!Title||!contents||!authorID||!MealType){
        return res.status(401).json({message:"More data is required"})
      }
    
      const user = await prisma.user.findUnique({
        where:{
            id:parseInt(authorID)
        }
      })
     
      if(!user){
         return res.status(401).json({message:"user does not exist"})
      }
      
      const checkDay=await prisma.day.findFirst({
         where:{
            authorID:parseInt(authorID)
         }
      })

      if(!checkDay){
          return res.status(404).json({message:"The Day does not exist"})
      }
     
      const updateUser=await prisma.breakfastData.create({
         data:{
            Title:Title,
            contents:contents,
            MealType:MealType,
            authorID:checkDay.id
         }
      })
      
      res.status(200).json({message:"Your Breakfast is created"})

    }catch(error){
        res.status(400).json({message:error})
    }
}

const createLunch=async(req:Request,res:Response)=>{
  try{
      const {Title,contents,MealType,authorID}=req.body;

      if(!Title||!contents||!MealType||!authorID){
         return res.status(401).json({message:"Insufficent Data"});
      }

      const user = await prisma.user.findUnique({
        where:{
            id:parseInt(authorID)
        }
      })

      if(!user){
         return res.status(401).json({message:"user does not exist"})
      }

      const checkDay=await prisma.day.findFirst({
         where:{
            authorID:parseInt(authorID)
         }
      })

      if(!checkDay){
          return res.status(404).json({message:"The Day does not exist"})
      }

     const updateLunch=await prisma.lunchData.create({
        data:{
            Title:Title,
            contents:contents,
            MealType:MealType,
            authorID:checkDay.id
        }
     })

     res.status(200).json({message:"Your Lunch is created"})      
  }catch(error){
    res.status(400).json({message:"Something went wrong while creating the Lunch"})
  }
}

const createDinner=async(req:Request,res:Response)=>{
  try{
    const {Title,contents,MealType,authorID}=req.body;

    if(!Title||!contents||!MealType||!authorID){
       return res.status(401).json({message:"Insufficent Data"});
    }

    const user = await prisma.user.findUnique({
      where:{
          id:parseInt(authorID)
      }
    })

    if(!user){
       return res.status(401).json({message:"user does not exist"})
    }

    const checkDay=await prisma.day.findFirst({
      where:{
         authorID:parseInt(authorID)
      }
   })

   if(!checkDay){
       return res.status(404).json({message:"The Day does not exist"})
   }

   const updateDinnerData=await prisma.dinnerData.create({
      data:{
          Title:Title,
          contents:contents,
          MealType:MealType,
          authorID:checkDay.id
      }
   })

   res.status(200).json({message:"Your Dinner is created"})
  }catch(error){
    return res.send(400).json({message:"Something went wrong while creating the Dinner"})
  }
}

const updateBreakfast=async(req:Request,res:Response)=>{
   try{
      const {Title,contents,authorID,BreakfastID}=req.body;

      if(!authorID||!BreakfastID){
          return res.status(401).json({message:"Insufficient Data"})
      }

      const user=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!user){
          return res.status(401).json({message:"User not found"})
      }

      const isday=await prisma.day.findFirst({
         where:{
            authorID:parseInt(authorID)
         }
      })

      if(!isday){
          return res.status(401).json({message:"Day Does not exist"})
      }
      
      if(Title){
         const updateBreakfast=await prisma.breakfastData.update({
            where:{
               id:parseInt(BreakfastID)
            },
            data:{
               Title:Title,
            }
         })
      }

      if(contents){
         const updateBreakfast=await prisma.breakfastData.update({
            where:{
               id:parseInt(BreakfastID)
            },
            data:{
               contents:contents,
            }
         })
      }

      res.status(200).json({message:"The Breakfast is updated"});
      
   }catch(error){
      res.status(400).json({message:"Somthing went wrong while wrong while updating the breakfast"})
   }
}

const updateLunch=async(req:Request,res:Response)=>{
   try{
      const {Title,contents,authorID,LunchID}=req.body;

      if(!authorID||!LunchID){
          return res.status(401).json({message:"Insufficient Data"})
      }

      const user=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!user){
          return res.status(401).json({message:"User not found"})
      }

      const isday=await prisma.day.findFirst({
         where:{
            authorID:parseInt(authorID)
         }
      })

      if(!isday){
          return res.status(401).json({message:"Day Does not exist"})
      }
      
      if(Title){
         const updateLunch=await prisma.lunchData.update({
            where:{
               id:parseInt(LunchID)
            },
            data:{
               Title:Title,
            }
         })
      }

      if(contents){
         const updateLunch=await prisma.lunchData.update({
            where:{
               id:parseInt(LunchID)
            },
            data:{
               contents:contents,
            }
         })
      }

      res.status(200).json({message:"The Lunch is updated"});
      
   }catch(error){
      res.status(400).json({message:"Somthing went wrong while wrong while updating the Lunch"})
   }
}

const updateDinner=async(req:Request,res:Response)=>{
   try{
      const {Title,contents,authorID,DinnerID}=req.body;

      if(!authorID||!DinnerID){
          return res.status(401).json({message:"Insufficient Data"})
      }

      const user=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!user){
          return res.status(401).json({message:"User not found"})
      }

      const isday=await prisma.day.findFirst({
         where:{
            authorID:parseInt(authorID)
         }
      })

      if(!isday){
          return res.status(401).json({message:"Day Does not exist"})
      }
      
      if(Title){
         const updateLunch=await prisma.dinnerData.update({
            where:{
               id:parseInt(DinnerID)
            },
            data:{
               Title:Title,
            }
         })
      }

      if(contents){
         const updateLunch=await prisma.dinnerData.update({
            where:{
               id:parseInt(DinnerID)
            },
            data:{
               contents:contents,
            }
         })
      }

      res.status(200).json({message:"The Dinner is updated"});
      
   }catch(error){
      res.status(400).json({message:"Somthing went wrong while wrong while updating the Dinner"})
   }
}



export {
    createMeal,createBreakfast,createDinner,createLunch,updateBreakfast,updateLunch,updateDinner
}