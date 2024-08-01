import { Router } from "express";
import FormController from "../controllers/form.controller.js";


const router = Router();

router.get("/myforms", FormController.list);

router.get("/:id",FormController.viewForm)
//router.post("/form/:id", ResponseController.submitResponse);

router.get("/r/:id", FormController.resForm)
//router.post("/form/r/:id",ResponseController.submitResponse);
router.post("/search", FormController.search);

router.get("/history/:id", FormController.viewHistory); // list of forms page

router.post("/:id/getformjson", FormController.getFormJson);

router.get("/:id/edit", FormController.editForm)
router.post("/:id/edit", FormController.updateForm);

router.get("/status/:id", FormController.getStatus);
router.get("/statusBut/:id", FormController.getStatusBut);

router.delete("/deleteAll", FormController.deleteAllForms);
router.delete("/delete/:form_id", FormController.deleteForm);
router.route("/access/:form_id").post(FormController.giveAccess);
router.post("/access/:form_id/authorizedemails",FormController.getAuthorizedEmails);
router.post("/access/:form_id/removeAuthorizedEmail",FormController.removeAuthorizedEmail);
router.post("/publish/:id", FormController.publish);
router.post("/close/:id", FormController.closeForm);
router.post("/preview", FormController.preview);


export {router};