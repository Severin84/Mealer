import mongoose from "mongoose";
import { Request, Response } from "express";
import {User,userInput,loginUser} from "../models/user";
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserRequest } from "../middleware/Requesttypes";

const prisma=new PrismaClient()

const isPasswordCorrect=async function(truePassword:userInput['password'],password:userInput['password']) {
   return await bcrypt.compare(truePassword,password);
}

const generateAccessToken=function(user){
    return jwt.sign(
    {
       _id:user.id,
       email:user.email,
       name:user.name
    },process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

const generateRefreshToken=function(user){
    return jwt.sign(
      {
        _id:user.id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
    )
}
const generateAccessandRefreshToken=async(userID)=>{
  
   const user=await prisma.user.findFirst(userID);
  
   const accessToken=generateAccessToken(user);
   
   const refreshToken=generateRefreshToken(user);
    
   const refupdate=await prisma.user.update({
      where:{
        id:userID 
      },
      data:{
         referanceToken:refreshToken
      }
   })
   
   return {accessToken,refreshToken};
}

const createUser=async(req:Request,res:Response)=>{
    try{
       const {name,email,password}=req.body;
       
       if(!name||!email||!password){
           return res.status(400).json({message:"All name email and password is required"})
       }
      
       const user = await prisma.user.findFirst(
         {
            where:{
               email:email
            }
         }
       );
    
       if(user){
         return res.status(409).json({message:"Either Username or Email already exist"})
       }
       
       const userInput:userInput={
          name,email,password
       }
      
       const hashedPassword=await bcrypt.hash(password,10);


       const userCreated=await prisma.user.create({data:{name:name,email:email,password:hashedPassword,Days:{create:[]}}});
      
       res.status(200).json({message:"User Created"});

    }catch(error){
       res.status(405).json({message:"Something went wrong while registering the user"})
    }
}

const loginUser=async(req:Request,res:Response)=>{
    try{
       
       const {email,password}=req.body
     
       if(!email||!password){
          return res.status(400).json({message:"All fields are required"});
       }
      
       const loginUser:loginUser={
          email,password
       }
      
       const isUser=await prisma.user.findFirst(
       {
         where:{
            email:email,
         }
       }
      );
      
       if(!isUser){
          return res.status(404).json({message:"User does not exist"})
       }

       const PasswordCheck=await isPasswordCorrect(password,isUser.password)
      
       if(!PasswordCheck){
           return res.status(404).json({message:"Email or Password is Incorrect"})
       }
      
       
       const {accessToken,refreshToken}=await generateAccessandRefreshToken(isUser.id);
      

       const login=await prisma.user.update({
         where:{
            email:email
         },
         data:{
            isLoggedIn:true
         }
       })


       res.cookie('refreshToken',refreshToken,{httpOnly:true,secure:true});
       res.cookie('accessToken',accessToken,{httpOnly:true,secure:true})
       res.status(200).json({data:login});
    }catch(error){
        res.status(405).json({message:"something went wrong while login the user"})
    }
}

const logOut=async(req:IUserRequest,res:Response)=>{
    try{
       const token:string=req.cookies?.refreshToken;

      if(token){
         const user=await prisma.user.findFirst({
            where:{
               referanceToken:token
            }
          })

         if(user){
            const changeloginstatue=await prisma.user.update({
               where:{
                  id:user.id
               },
               data:{
                  isLoggedIn:false
               }
            })
         }else{
            res.status(404).json({message:"user not found"})
         }
      }else{
          res.status(405).json({message:"Something went wrong while logging out the user"})
      }
    
       res.clearCookie('accessToken');
       res.clearCookie('refreshToken');
       res.clearCookie('Token');
       res.status(200).json({message:"User Logged out"})
    }catch(error){
        res.status(405).json({message:"something went wrong while loginOut"})
    }
}


export {
    createUser,loginUser,logOut
}