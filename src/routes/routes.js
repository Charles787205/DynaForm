import { Router } from "express";
import FormController from "../controllers/form.controller.js";
import Components from "../controllers/components.controller.js";

const router = Router();

// COMPONENTS
router.route("/").get(FormController.get);
router.post("/components/:name", Components.getComponent);
router.post("/components/fields/:name", Components.getField);

//FORMS
router
  .route("/create")
  .get(FormController.getCreatePage)
  .post(FormController.submit);

router.get("/forms", FormController.list);
router.get("/view", FormController.view);
router.post("/template/:template", Components.getTemplate);
router.delete("/deleteAll", FormController.deleteAllForms); // delete all form
router.delete("/delete/:form_id", FormController.deleteForm); // delete form
// router.post("/submit", FormController.post);

// RESPONSE
router.get("/response", FormController.response);
router.get("/response/:name", FormController.response);

// MODAL
router.post("/components/modal/show", Components.showModal);
router.post("/components/modal/preview", Components.showComponentPreview);

export default router;

// router.post("/createForm", FormController.createForm); // save form to the database
