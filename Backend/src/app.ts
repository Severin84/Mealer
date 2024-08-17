import express from "express";
import cors from 'cors';
import dotenv from "dotenv"
import userRouter from "../router/user"
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";


const app=express();
const PORT=8080;
app.use(express.json());
dotenv.config();
app.use(bodyparser.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))

app.use("/api/v1/user",userRouter);

app.listen(PORT,()=>{
    console.log(`Listing on ${PORT}`)
})
