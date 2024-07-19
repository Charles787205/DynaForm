import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/form.js";
import Form from "../models/form.models.js";
import { ObjectId } from "mongodb";
import validators from "validator";

const index = async (req, res) => {
	/**
	 *  index page
	 * route "/" get
	 */
	res.render("index");
};

const getCreatePage = async (req, res) => {
	/**
	 *
	 * Handles the creation of a form.
	 * route "/create" get
	 */
	res.render("pages/create");
};

const submit = async (req, res) => {
	/**
	 * Handles the submission of a form.
	 * route "/create" post
	 *
	 */
	if (req.isUnauthenticated()) return res.status(401).send("Unauthorized");
	try {
		const formData = req.body;

		const components = [];
		formData.formComponents.forEach((component) => {
			const formComponent = new FormComponent(component);
			const newComponent = new Component(formComponent.toCreateFormModel());
			components.push(newComponent);
		});

		const form = new FormObject({
			user_id: req.user._id,
			name: formData.formName,
			description: formData.formDescription,
			components: components,
		});

		const formId = await new Form(form.toCreateFormModel()).save();
		const form_id = formId._id;
		res.status(200).send({ form_id });
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send(error);
	}
};

const list = async (req, res) => {
	// if (!req.isAuthenticated()) {
	// 	res.redirect("/auth/google");
	// }
	console.log("USER: ", req.user);
	try {
		const allForms = await Form.find({
			user_id: req.user._id,
		}).sort({ createdAt: -1 });

		const forms = allForms.map((form) => {
			return {
				id: form._id,
				name: form.name,
				description: form.description,
				date: form.createdAt.toISOString().split("T")[0],
			};
		});
		res.render("pages/listform", { forms });
		// res.status(200).send({ forms });
	} catch (error) {
		console.log("Error retrieving forms:", error);
	}
};
//route "/forms/:id" get
const viewForm = async (req, res) => {
	const form_id = req.params.id;
	try {
		const form = await Form.findById(form_id);
		console.log("FORM RETRIEVED FROM DB: ", form.toJSON());

		res.render("pages/viewform", { form: form.toJSON() });
	} catch (error) {
		console.error("Error retrieving form:", error);
		res.status(500).send("Error retrieving form");
	}
};

const editForm = async (req, res) => {
	/**
	 * Handles the submission of a form.
	 * route "/forms/:id/edit" post
	 */
	const { email } = req.body;
	const form_id = req.params.id;
	const user_id = req.user._id;
	try {
		const form = await Form.findOne({
			$and: [
				{ _id: form_id },
				{ $or: [{ authorized_emails: email }, { user_id: user_id }] },
			],
		});

		console.log("FORM: ", form);
		if (!form) {
			console.log("Form not found");
			// res.status(200).send("false");
			res.redirect(`/form/${form_id}`);
		}
		// return res.status(200).send("true");
		res.render("pages/editform", { form: form.toJSON() });
	} catch (error) {
		console.error(error);
	}
};

const updateForm = async (req, res) => {
	/**
	 * Handles the edit made in the form
	 * /forms/:id/edit postunValidators: true
	 */
	const components = [];
	formData.formComponents.forEach((component) => {
		const formComponent = new FormComponent(component);
		const newComponent = new Component(formComponent.toCreateFormModel());
		components.push(newComponent);
	});

	const newForm = {
		name: formData.formName,
		description: formData.formDescription,
		components: components,
	};
	const form_id = req.params.id;
	const form = await Form.findByIdAndUpdate(form_id, newForm);
	console.log(form);
	res.send(200, "Form updated");
};

//Delete Form
const deleteForm = async (req, res) => {
	if (!req.isAuthenticated()) {
		res.redirect("/auth/google");
	}
	const { form_id } = req.params;
	try {
		const deleteForm = await Form.deleteOne({ _id: form_id });
		if (deleteForm) {
			console.log("Form deleted:", deleteForm);
			return res.status(200).send(deleteForm);
		}
		return res.status(404).send("Form not found");
	} catch (error) {
		console.error("Error deleting form:", error);
		res.status(500).send("Error deleting form");
	}
};

// Give Access
const giveAccess = async (req, res) => {
	const emails = req.body;
	const form_id = req.params.form_id;

	const validEmails = emails.filter((email) => validators.isEmail(email));

	if (validEmails.length === 0) {
		return res.status(400).send("No valid emails");
	}
	try {
		// $addToSet used to avoid duplicates, $each is used to add multiple emails
		const updatedForm = await Form.updateOne(
			{ _id: form_id },
			{ $addToSet: { authorized_emails: { $each: validEmails } } },
			{ new: true }
		);
		console.log("Access given:", updatedForm);
		res.status(200).send({ "Access given": updatedForm });
	} catch (error) {
		console.error("Error giving access:", error);
		return res
			.status(500)
			.send({ error: "An error occurred while giving access." });
	}
};

const deleteAllForms = async (req, res) => {
	// route "/deleteAll"
	try {
		await Form.deleteMany({});
		res.status(200).send("All forms deleted");
	} catch (error) {
		console.error("Error deleting forms:", error);
		res.status(500).send("Error deleting forms");
	}
};

//preview
const preview = async (req, res) => {
	res.render(`pages/preview`);
};

export default {
	index,
	getCreatePage,
	submit,
	list,
	editForm,
	viewForm,
	updateForm,
	preview,
	deleteAllForms,
	deleteForm,
	giveAccess,
};
// user_id: new ObjectId("6695ddb53109d5d09d912955"), my id
// const user_id = new ObjectId("66960301ed29140e5c586913"); // franco id ...

// req.user._id
