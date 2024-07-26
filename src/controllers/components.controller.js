import { v4 as uuidv4 } from "uuid";
import { texts, inputs } from "../data/fields.js";
import Form from "../models/form.models.js";

//COMPONENTS
const getComponent = async (req, res) => {
	const componentName = req.params.name;
	const options = {
		id: uuidv4(),
		...req.body,
	};
	res.render(`components/${componentName}`, { options });
};

const getField = async (req, res) => {
	const componentName = req.params.name;
	const query = {
		id: uuidv4(),
		...req.body,
	};
	res.render(`components/fields/${componentName}`, { query });
};

//TEMPLATES
const getTemplate = async (req, res) => {
	const template = req.params.template;
	res.render(`template/${template}`);
};

// MODALS
const showModal = async (req, res) => {
	res.render("components/modal/index", {
		texts: texts,
		inputs: inputs,
	});
};

const showShareModal = async (req, res) => {
	const form_id = req.body.formId;
	const form = await Form.findById(form_id);
	console.log("formId: ", form._id, "authEmails: ", form.authorized_emails);
	res.render("components/modal/share/index", {
		formId: form._id,
		authorized_emails: form.authorized_emails,
	});
};

//Component Preview In Modal
const showComponentPreview = async (req, res) => {
	res.render("components/modal/preview", { ...req.body, view: true });
};

// Form List Component
const getFormList = async (req, res) => {
	const forms = req.body;
	res.render("components/formlist", { forms });
};

export default {
	getComponent,
	getField,
	showModal,
	getTemplate,
	showComponentPreview,
	getFormList,
	showShareModal,
};
