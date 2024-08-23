import express from "express";
import { createBreakfast, createDinner, createLunch, createDay, deleteBreakfast, deleteDay, deleteDinner, deleteLunch, updateBreakfast, updateday, updateDinner, updateLunch } from "../Controllers/days";
import verifyJWT from "../middleware/verifyUser";

const router=express.Router();

router.post('/createDay',verifyJWT,createDay);
router.post("/updateDay",verifyJWT,updateday);
router.post("/deleteDay",verifyJWT,deleteDay)
router.post("/createbreakfast",verifyJWT,createBreakfast);
router.post("/createlunch",verifyJWT,createLunch);
router.post("/createdinner",verifyJWT,createDinner);
router.post("/updatebreakfast",verifyJWT,updateBreakfast);
router.post("/updatelunch",verifyJWT,updateLunch);
router.post("/updatedinner",verifyJWT,updateDinner);
router.post("/deletebreakfast",verifyJWT,deleteBreakfast);
router.post("/deletelunch",verifyJWT,deleteLunch);
router.post("/deletedinner",verifyJWT,deleteDinner);

export default router