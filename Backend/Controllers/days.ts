import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client"

const prisma=new PrismaClient();

const createDay=async(req:Request,res:Response)=>{
    try{
       const {day,authorID}=req.body

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

const updateday=async(req:Request,res:Response)=>{
  try{
     const {authorID,DayID,day}=req.body;

     if(!authorID||!DayID||!day){
       res.status(401).json({message:"Insufficient Data"});
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

     res.status(200).json({message:"Your day has been updated"})

  }catch(error){
     res.status(400).json({message:"Something went wrong while updating the day"})
  }
}


const deleteDay=async(req:Request,res:Response)=>{
   try{
      const {authorID,DayId}=req.body;
      
      if(!authorID||!DayId){
          res.status(401).json({message:"Insufficient Data"})
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

      res.json(200).json({message:'The Day is Deleted'})
   }catch(error){
      res.status(400).json({message:"Something went wrong while deleting the day"})
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
      
    
      res.status(200).json({message:"The breakfast has been updated"})
      
   }catch(error){
      res.status(400).json({message:"Somthing went wrong while wrong while updating the breakfast"})
   }
}

const updateLunch=async(req:Request,res:Response)=>{
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
      res.status(400).json({message:"Somthing went wrong while wrong while updating the Lunch"})
   }
}

const updateDinner=async(req:Request,res:Response)=>{
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
      res.status(400).json({message:"Somthing went wrong while wrong while updating the Dinner"})
   }
}

const deleteBreakfast=async(req:Request,res:Response)=>{
   try{
      const {authorID,mealID}=req.body
      
      if(!authorID||!mealID){
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

      const breakfast=await prisma.breakfastData.findFirst({
         where:{
            id:parseInt(authorID)
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
      res.status(401).json({message:"Something went wrong while deleting the breakfast"})
   }
}

const deleteLunch=async(req:Request,res:Response)=>{
   try{
      const {authorID,mealID}=req.body
      
      if(!authorID||!mealID){
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

      const Lunch=await prisma.lunchData.findFirst({
         where:{
            id:parseInt(authorID)
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
      res.status(401).json({message:"Something went wrong while deleting the Lunch"})
   }
}

const deleteDinner=async(req:Request,res:Response)=>{
   try{
      const {authorID,mealID}=req.body
      
      if(!authorID||!mealID){
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

      const Dinner=await prisma.dinnerData.findFirst({
         where:{
            id:parseInt(authorID)
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
      res.status(401).json({message:"Something went wrong while deleting the Dinner"})
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
