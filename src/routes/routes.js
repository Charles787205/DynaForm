import { Router } from "express";
import FormController from "../controllers/form.controller.js";
import Components from "../controllers/components.controller.js";
import Modal from "../controllers/modal.controller.js";
const router = Router();

router.route("/").get(FormController.get).post(FormController.post);
router.get("/components/:name", Components.getComponent);
router.get("/components/fields/:name", Components.getField);
router.get("/components/modal", Components.getModal); // view the modal that holds the components for the form
router.get("/create", FormController.createForm);
router.get("/listform", FormController.listForm);
router.get("/viewform", FormController.viewForm);
router.get("/template/:template", Components.getTemplate);
router.get("/modal/:modals", Components.designModal);
router.post("/submit", FormController.post);

// modal route
router.get("/components/modal/preview", Modal.get_title);

export default router;

// router.post("/createForm", FormController.createForm); // save form to the database
