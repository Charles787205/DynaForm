import { Router } from "express";
import DbConnect from "../controllers/dbcontroller.js";
const dbRouter = Router();

dbRouter.post("/", DbConnect.add);

export default dbRouter;
