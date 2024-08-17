import { NextFunction } from "express";
import mongoose from "mongoose";
import {Schema,model,Model} from "mongoose"
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";

interface Iuser{
    name:string,
    email:string,
    password:string,
    useCase:string,
    referanceToken?:string,
    isPasswordCorrect(password:string):boolean;
    generateAccessToken():string;
    generateRefreshToken():string;
}

interface userInput{
  name:Iuser['name'],
  email:Iuser['email'],
  password:Iuser['password'],
  referanceToken?:Iuser['referanceToken']
}

interface loginUser{
  email:Iuser['email'],
  password:Iuser['password']
}

const UserSchema=new Schema({
  name:{type:Schema.Types.String,required:true},
  email:{type:Schema.Types.String,required:true},
  password:{type:Schema.Types.String,required:true},
  useCase:{type:Schema.Types.String,required:true},
  referanceToken:{type:Schema.Types.String}
},{collection:'users',timestamps:true})

UserSchema.pre("save", async function(next:NextFunction) {
    if(!this.isModified("password")){
       return next();
    }

    this.password=await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.isPasswordCorrect=async function(password:Iuser['password']) {
   return await bcrypt.compare(this.password,password);
}

UserSchema.methods.generateAccessToken=function(){
    return jwt.sign(
    {
       _id:this._id,
       email:this.email,
       name:this.name
    },process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
      {
        _id:this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
    )
}


const User:Model<Iuser>=mongoose.model<Iuser>('User',UserSchema);

export {User,userInput,loginUser};


