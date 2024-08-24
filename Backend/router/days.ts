import express from "express";
import { createBreakfast, createDinner, createLunch, createDay, deleteBreakfast, deleteDay, deleteDinner, deleteLunch, updateBreakfast, updateday, updateDinner, updateLunch } from "../Controllers/days";
import verifyJWT from "../middleware/verifyUser";

const router=express.Router();

router.post('/createDay',verifyJWT,createDay);
router.patch("/updateDay",verifyJWT,updateday);
router.delete("/deleteDay",verifyJWT,deleteDay)
router.post("/createbreakfast",verifyJWT,createBreakfast);
router.post("/createlunch",verifyJWT,createLunch);
router.post("/createdinner",verifyJWT,createDinner);
router.patch("/updatebreakfast",verifyJWT,updateBreakfast);
router.patch("/updatelunch",verifyJWT,updateLunch);
router.patch("/updatedinner",verifyJWT,updateDinner);
router.delete("/deletebreakfast",verifyJWT,deleteBreakfast);
router.delete("/deletelunch",verifyJWT,deleteLunch);
router.delete("/deletedinner",verifyJWT,deleteDinner);

export default router