import express from "express";
import { createBreakfast, createDinner, createLunch, createMeal } from "../Controllers/days";

const router=express.Router();

router.post('/createMeal',createMeal);
router.post("/createbreakfast",createBreakfast);
router.post("/createlunch",createLunch);
router.post("/createdinner",createDinner)

export default router