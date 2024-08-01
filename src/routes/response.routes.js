import { Router } from "express";
import ResponseController from "../controllers/response.controller.js";

const router = Router();
router.route("/f/:form_id").post(ResponseController.submitResponse);
router.get("/feedback/:response_id", ResponseController.getFeedback);
router.get("/:form_id", ResponseController.getSummary);
router.delete("/d/:response_id", ResponseController.deleteResponse);
router.get("/r/:response_id",ResponseController.getResponseDetails);

export {router}