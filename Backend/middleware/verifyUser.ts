import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from 'express'
import {PrismaClient} from "@prisma/client"
import {JwtPayload} from "jsonwebtoken"
import { IUserRequest } from "./Requesttypes";
const prisma=new PrismaClient();


const verifyJWT=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      //console.log(req.cookies); 
       const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
      
       if(token===undefined){
          return res.status(402).json({message:"Unauthorized Request"});
       }

       const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
       
       const user= await prisma.user.findFirst({
          where:{
            id:(decodeToken as JwtPayload)?._id
          }
       })

       if(!user){
         return res.status(404).json({message:"Unauthorized Request"});
       }

      //  req.user=user

       next();
    }catch(error){
        res.status(401).json({message:"Something went wrong while verifying the user"})
    }
}

export default verifyJWT;