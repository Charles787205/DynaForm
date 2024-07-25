import { Router } from "express";
import FormController from "../controllers/form.controller.js";
import Components from "../controllers/components.controller.js";
import ResponseController from "../controllers/response.controller.js";
const router = Router();

// COMPONENTS
router.route("/").get(FormController.index);
router.post("/components/:name", Components.getComponent);
router.post("/components/fields/:name", Components.getField);
router.post("/template/:template", Components.getTemplate);
//FORMS
router
  .route("/create")
  .get(FormController.getCreatePage)
  .post(FormController.submit);
router.get("/forms", FormController.list);
router
  .route("/form/:id")
  .get(FormController.viewForm)
  .post(ResponseController.submitResponse);
router
  .route("/form/r/:id")
  .get(FormController.resForm)
  .post(ResponseController.submitResponse);

router
  .route("/form/:id/edit")
  .get(FormController.editForm)
  .post(FormController.updateForm);
router.delete("/deleteAll", FormController.deleteAllForms);
router.delete("/delete/:form_id", FormController.deleteForm);
router.route("/accessForm/:form_id").post(FormController.giveAccess);
router
  .route("/accessForm/:form_id/authorizedemails")
  .post(FormController.getAuthorizedEmails);
router
  .route("/accessForm/:form_id/removeAuthorizedEmail")
  .post(FormController.removeAuthorizedEmail);
router.post("/components/modal/share", Components.showShareModal);
router.get("/forms", FormController.list); // list of forms page

router.post("/search", FormController.search); // search

router.get("/error", FormController.errorPage); // error

router.get("/status/:id", FormController.getStatus);
router.get("/statusBut/:id", FormController.getStatusBut);

// publish button
router.post("/publish/:id", FormController.publish);
router.post("/close/:id", FormController.closeForm);

// RESPONSE
router.route("/response/f/:form_id").post(ResponseController.submitResponse);
router.get("/response/feedback/:response_id", ResponseController.getFeedback);
router
  .route("/response/r/:response_id")
  .get(ResponseController.getResponseDetails);
//PREVIEW
router.post("/preview", FormController.preview);

// MODAL
router.post("/components/modal/show", Components.showModal);
router.post("/components/modal/preview", Components.showComponentPreview);

export default router;
