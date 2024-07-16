import { Router } from "express";
import FormController from "../controllers/form.controller.js";
import Components from "../controllers/components.controller.js";
import Modal from "../controllers/modal.controller.js";
const router = Router();

// COMPONENTS
router.route("/").get(FormController.get);
router.get("/components/:name", Components.getComponent);
router.get("/components/fields/:name", Components.getField);

//FORMS
router
  .route("/create")
  .get(FormController.createForm)
  .post(FormController.submitForm);
router.get("/listform", FormController.listForm);
router.get("/viewform", FormController.viewForm);
router.get("/response", FormController.viewResponse);
router.get("/template/:template", Components.getTemplate);

// MODAL
router.get("/components/modal/components", Components.showModal);
router.get("/components/modal/preview", Components.showComponentPreview);

export default router;

// router.post("/createForm", FormController.createForm); // save form to the database
