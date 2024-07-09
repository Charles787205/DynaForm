import { Router } from "express";
import DbConnect from "../controllers/db.controller.js";
const dbRouter = Router();

dbRouter.post("/", DbConnect.add);

export default dbRouter;
