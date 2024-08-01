import { Router } from "express";
import Components from "../controllers/components.controller.js";


const router = Router();

router.post("/:name", Components.getComponent);
router.post("/fields/:name", Components.getField);
router.post("/modal/share", Components.showShareModal);
router.post("/modal/show", Components.showModal);
router.post("/modal/preview", Components.showComponentPreview);
//router.post("/template/:template", Components.getTemplate);




export {router};