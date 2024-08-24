import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client"

const prisma=new PrismaClient();

const createDay=async(req:Request,res:Response)=>{
    try{
       const {day,authorID}=req.body

       if(!day||!authorID){
          return res.send(400).json({message:"Insufficient data"})
       }
    
       const isUser=await prisma.user.findUnique({
        where:{
            id:parseInt(authorID)
        }
       })

       if(!isUser){
          return res.status(404).json({message:"User does not exist"});
       }

       const newDay=await prisma.day.create({
         data:{
            day:day,authorID:parseInt(authorID),Breakfasts:{create:[]},Lunchs:{create:[]},Dinners:{create:[]}
         }
       })

       res.status(200).json({data:newDay});
    }catch(error){
        res.status(405).json({message:"Something went wrong while Creating the day"})
    }
}

const updateday=async(req:Request,res:Response)=>{
  try{
     const {authorID,DayID,day}=req.body;

     if(!authorID||!DayID||!day){
       res.status(400).json({message:"Insufficient Data"});
     }

     const user=await prisma.user.findFirst({
       where:{
         id:parseInt(authorID)
       }
     })

     if(!user){
       res.status(404).json({message:"User Not found"})
     }

     const isdayexist=await prisma.day.findFirst({
      where:{
         id:parseInt(DayID)
      }
     })

     if(!isdayexist){
       res.status(404).json({message:"Day Does not exist"});
     }

     const updateDay=await prisma.day.update({
      where:{
         id:isdayexist.id
      },
      data:{
         day:day
      }
     })

     res.status(200).json({data:updateDay})

  }catch(error){
     res.status(405).json({message:"Something went wrong while updating the day"})
  }
}


const deleteDay=async(req:Request,res:Response)=>{
   try{
      const {authorID,DayId}=req.body;
      
      if(!authorID||!DayId){
          res.status(400).json({message:"Insufficient Data"})
      }

      const isUser=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!isUser){
          res.status(404).json({message:"User does not exist"})
      }

      const isDay=await prisma.day.findFirst({
         where:{
            id:parseInt(DayId)
         }
      })

      if(!isDay){
          res.send(404).json({message:"Day Does not exist"});
      }

      const deleteDay=await prisma.day.delete({
         where:{
            id:parseInt(DayId)
         }
      })

      res.json(200).json({data:deleteDay})
   }catch(error){
      res.status(405).json({message:"Something went wrong while deleting the day"})
   }
}

const createBreakfast=async(req:Request,res:Response)=>{
    try{
      
      const {Title,contents,authorID,MealType,dayID}=req.body;
      
      if(!Title||!contents||!authorID||!MealType||!dayID){
        return res.status(400).json({message:"More data is required"})
      }
    
      const user = await prisma.user.findUnique({
        where:{
            id:parseInt(authorID)
        }
      })
     
      if(!user){
         return res.status(404).json({message:"user does not exist"})
      }
      
      const checkDay=await prisma.day.findFirst({
         where:{
            id:parseInt(dayID)
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
            authorID:user.id,
            dayID:checkDay.id
         }
      })
      
      res.status(200).json({data:updateUser})
    }catch(error){
        res.status(405).json({message:error})
    }
}

const createLunch=async(req:Request,res:Response)=>{
  try{
      const {Title,contents,MealType,authorID,dayID}=req.body;

      if(!Title||!contents||!MealType||!authorID){
         return res.status(400).json({message:"Insufficent Data"});
      }

      const user = await prisma.user.findUnique({
        where:{
            id:parseInt(authorID)
        }
      })

      if(!user){
         return res.status(404).json({message:"user does not exist"})
      }

      const checkDay=await prisma.day.findFirst({
         where:{
            id:parseInt(dayID)
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
            authorID:user.id,
            dayID:checkDay.id
        }
     })

     res.status(200).json({data:updateLunch})      
  }catch(error){
    res.status(405).json({message:"Something went wrong while creating the Lunch"})
  }
}

const createDinner=async(req:Request,res:Response)=>{
  try{
    const {Title,contents,MealType,authorID,dayID}=req.body;

    if(!Title||!contents||!MealType||!authorID){
       return res.status(400).json({message:"Insufficent Data"});
    }

    const user = await prisma.user.findUnique({
      where:{
          id:parseInt(authorID)
      }
    })

    if(!user){
       return res.status(404).json({message:"user does not exist"})
    }

    const checkDay=await prisma.day.findFirst({
      where:{
         id:parseInt(dayID)
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
          authorID:user.id,
          dayID:checkDay.id
      }
   })

   res.status(200).json({data:updateDinnerData})
  }catch(error){
    return res.send(405).json({message:"Something went wrong while creating the Dinner"})
  }
}

const updateBreakfast=async(req:Request,res:Response)=>{
   try{
      const {authorID,DayID,mealID,contents,Title} = req.body;
      
      if(!authorID||!DayID||!mealID){
         return res.send(400).json({message:"Insufficient Data"});
      }

      const user = await prisma.user.findFirst({
        where:{
            id:parseInt(authorID)
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
      
      res.status(200).json({message:"The breakfast has been updated"})
   }catch(error){
      res.status(405).json({message:"Somthing went wrong while wrong while updating the breakfast"})
   }
}

const updateLunch=async(req:Request,res:Response)=>{
   try{
      const {authorID,DayID,mealID,contents,Title} = req.body;
      
      if(!authorID||!DayID||!mealID){
         return res.send(400).json({message:"Insufficient Data"});
      }

      const user = await prisma.user.findFirst({
        where:{
            id:parseInt(authorID)
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

      const mealTime=await prisma.lunchData.findFirst({
        where:{
            id:parseInt(mealID)
        }
      })

      if(!mealTime){
         return res.status(404).json({message:"This meal has not been created yet"})
      }

      if(Title){
        const updatecontents=await prisma.lunchData.update({
            where:{
                id:parseInt(mealID)
            },
            data:{
                Title:Title
            }
        })
      }

      if(contents){
        const updatecontents=await prisma.lunchData.update({
            where:{
                id:parseInt(mealID)
            },
            data:{
                contents:contents
            }
        })
      }
      
    
      res.status(200).json({message:"The lunch has been updated"})
   }catch(error){
      res.status(405).json({message:"Somthing went wrong while wrong while updating the Lunch"})
   }
}

const updateDinner=async(req:Request,res:Response)=>{
   try{
      const {authorID,DayID,mealID,contents,Title} = req.body;
      
      if(!authorID||!DayID||!mealID){
         return res.send(400).json({message:"Insufficient Data"});
      }

      const user = await prisma.user.findFirst({
        where:{
            id:parseInt(authorID)
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

      const mealTime=await prisma.dinnerData.findFirst({
        where:{
            id:parseInt(mealID)
        }
      })

      if(!mealTime){
         return res.status(404).json({message:"This meal has not been created yet"})
      }

      if(Title){
        const updatecontents=await prisma.dinnerData.update({
            where:{
                id:parseInt(mealID)
            },
            data:{
                Title:Title
            }
        })
      }

      if(contents){
        const updatecontents=await prisma.dinnerData.update({
            where:{
                id:parseInt(mealID)
            },
            data:{
                contents:contents
            }
        })
      }
      
      res.status(200).json({message:"The dinner has been updated"})
   }catch(error){
      res.status(405).json({message:"Somthing went wrong while wrong while updating the Dinner"})
   }
}

const deleteBreakfast=async(req:Request,res:Response)=>{
   try{
      const {authorID,dayID,mealID}=req.body
      
      if(!authorID||!mealID||dayID){
          return res.status(400).json({message:"Insufficient Data"})
      }

      const user=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!user){
          return res.status(404).json({message:"User not find"})
      }

      const isDay=await prisma.day.findFirst({
         where:{
            id:parseInt(dayID)
         }
      })

      if(!isDay){
          res.status(404).json({message:"Day Does not exist"})
      }

      const breakfast=await prisma.breakfastData.findFirst({
         where:{
            id:parseInt(mealID)
         }
      })

      if(!breakfast){
         return res.status(404).json({message:"breakfast does not exist"})
      }

      const breakfastDelete=await prisma.breakfastData.delete({
         where:{
            id:parseInt(mealID)
         }
      })

      res.status(200).json({message:"Meal Deleted"})
   }catch(error){
      res.status(405).json({message:"Something went wrong while deleting the breakfast"})
   }
}

const deleteLunch=async(req:Request,res:Response)=>{
   try{
      const {authorID,mealID,dayID}=req.body
      
      if(!authorID||!mealID||!dayID){
          return res.status(400).json({message:"Insufficient Data"})
      }

      const user=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!user){
          return res.status(404).json({message:"User not find"})
      }

      const isDay=await prisma.day.findFirst({
         where:{
            id:parseInt(dayID)
         }
      })

      if(!isDay){
         res.status(404).json({message:"Day Does not exist"})
      }

      const Lunch=await prisma.lunchData.findFirst({
         where:{
            id:parseInt(mealID)
         }
      })

      if(!Lunch){
         return res.status(404).json({message:"breakfast does not exist"})
      }

      const LunchDelete=await prisma.lunchData.delete({
         where:{
            id:parseInt(mealID)
         }
      })

      res.status(200).json({message:"Meal Deleted"})
   }catch(error){
      res.status(405).json({message:"Something went wrong while deleting the Lunch"})
   }
}

const deleteDinner=async(req:Request,res:Response)=>{
   try{
      const {authorID,mealID,dayID}=req.body
      
      if(!authorID||!mealID||!dayID){
          return res.status(400).json({message:"Insufficient Data"})
      }

      const user=await prisma.user.findFirst({
         where:{
            id:parseInt(authorID)
         }
      })

      if(!user){
          return res.status(404).json({message:"User not find"})
      }
      
      const isDay=await prisma.day.findFirst({
         where:{
            id:parseInt(dayID)
         }
      })

      if(!isDay){
         res.status(404).json({message:"Day Does not exist"})
      }

      const Dinner=await prisma.dinnerData.findFirst({
         where:{
            id:parseInt(mealID)
         }
      })

      if(!Dinner){
         return res.status(404).json({message:"breakfast does not exist"})
      }

      const DinnerDelete=await prisma.dinnerData.delete({
         where:{
            id:parseInt(mealID)
         }
      })

      res.status(200).json({message:"Meal Deleted"})
   }catch(error){
      res.status(405).json({message:"Something went wrong while deleting the Dinner"})
   }
}

export {
    createDay,
    updateday,
    deleteDay,
    createBreakfast,
    createDinner,
    createLunch,
    updateBreakfast,
    updateLunch,
    updateDinner,
    deleteBreakfast,
    deleteLunch,
    deleteDinner
}
