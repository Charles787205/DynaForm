import { Router } from "express";
import FormController from "../controllers/form.controller.js";
import Components from "../controllers/components.controller.js";
const router = Router();

router.route("/").get(FormController.get).post(FormController.post);
router.get("/components/:name", Components.getComponent);
router.get("/components/fields/:name", Components.getField);
router.post("/create", FormController.createForm); // save form to the database
router.post("/submit", FormController.post);

export default router;
