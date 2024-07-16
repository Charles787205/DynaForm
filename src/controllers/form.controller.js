import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/form.js";
import Form from "../models/form.models.js";
const get = async (req, res) => {
	res.redirect("/create");
};

const create = async (req, res) => {
	res.render("pages/create", { layout: "./layouts/main" });
};

const submit = async (req, res) => {
	try {
		const formData = req.body;

		const components = [];
		formData.formComponents.forEach((component) => {
			const formComponent = new FormComponent(component);
			console.log("formComponent", formComponent);
			const newComponent = new Component(formComponent.toCreateFormModel());
			components.push(newComponent);
		});

		const form = new FormObject({
			name: formData.formName,
			description: formData.formDescription,
			components: components,
		});

		await new Form(form.toCreateFormModel()).save();
		return res.json({ form });
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send(error);
	}
};

const edit = async (req, res) => {
	const data = {};

	res.render("pages/create", { data });
};

const list = async (req, res) => {
	const allForms = await Form.find();
	const forms = allForms.map((form) => {
		console.log("id", form._id);

		return {
			id: form._id,
			name: form.name,
			description: form.description,
			date: form.createdAt.toISOString().split("T")[0],
		};
	});

	// res.status(200).json({ forms: forms });
	res.render("pages/listform", { forms });
};

const view = async (req, res) => {
	const { form_id } = req.query;
	try {
		const get_form = await Form.findById(form_id);
		console.log(get_form.toJSON());

		res.render("pages/viewform", { get_form: get_form.toJSON() });
	} catch (error) {
		console.error("Error retrieving form:", error);
		res.status(500).send({ "Error retrieving form": error });
	}
};

const deleteForm = async (req, res) => {
	const { form_id } = req.params;
	try {
		const deleteForm = await Form.deleteOne({ _id: form_id });
		if (deleteForm) {
			console.log("Form deleted:", deleteForm);
			res.status(200).send(deleteForm);
		} else {
			res.status(404).send("Form not found");
		}
	} catch (error) {
		console.error("Error deleting form:", error);
		res.status(500).send("Error deleting form");
	}
};

const deleteAllForms = async (req, res) => {
	try {
		await Form.deleteMany({});
		res.status(200).send("All forms deleted");
	} catch (error) {
		console.error("Error deleting forms:", error);
		res.status(500).send("Error deleting forms");
	}
};

export default {
	get,
	create,
	submit,
	list,
	edit,
	view,
	deleteAllForms,
	deleteForm,
};
