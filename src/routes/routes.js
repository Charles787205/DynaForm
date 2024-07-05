import { Router } from "express";
import FormController from "../controllers/form.controller.js";
import Components from "../controllers/components.controller.js";

const router = Router();

router.route("/").get(FormController.get).post(FormController.post);

router.get("/components/:name", Components.get);
router.get("/create", FormController.createForm);

export default router;
