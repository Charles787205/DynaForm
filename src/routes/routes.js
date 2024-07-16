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
router.get("/form/:id", FormController.viewForm);
router.route("/form/:id/edit").get(FormController.editForm).post(FormController.updateForm);
router.post("/template/:template", Components.getTemplate);
router.delete("/deleteAll", FormController.deleteAllForms); 
router.delete("/delete/:form_id", FormController.deleteForm);

// RESPONSE
router.get("/response", FormController.response);
router.get("/response/:name", FormController.response);

// MODAL
router.post("/components/modal/show", Components.showModal);
router.post("/components/modal/preview", Components.showComponentPreview);

export default router;