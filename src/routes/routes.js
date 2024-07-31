import { Router } from "express";
import FormController from "../controllers/form.controller.js";

import {router as FormRouter} from "./form.routes.js";
import {router as ComponentRouter} from "./component.routes.js";
import {router as ResponseRouter} from "./response.routes.js";

const router = Router();


// COMPONENTS
router.route("/").get(FormController.index);

//FORMS
router.get("/create",FormController.getCreatePage)
router.post("/create",FormController.submit);

router.use("/form",FormRouter);
router.use("/components",ComponentRouter);

router.use("/response",ResponseRouter);




router.get("/error", FormController.errorPage); // error


// publish button



//PREVIEW
router.post("/preview", FormController.preview);

// MODAL

export default router;
