import express from 'express';
import {createUser,loginUser,logOut} from "../Controllers/user"
const router=express.Router();


router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/logout",logOut);

export default router

