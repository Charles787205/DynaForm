import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/form.js";
import Form from "../models/form.models.js";
import FormHistory from "../models/form_history.model.js";
import { upsertFormData } from "../util/form_controller.utils.js";
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
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	return res.render("pages/create");
};

const submit = async (req, res) => {
	/**
	 * Handles the submission of a form.
	 * route "/create" post
	 *
	 */
	if (req.isUnauthenticated()) return res.status(401).send("Unauthorized");
	try {
		const formData = req.body.formData;
		const fromPage = req.body.fromPage;
		const components = [];

		console.log(formData);

		//this for loop checks if the label is followed by an input field
		for (let i = 0; i < formData.formComponents.length; i++) {
			const component = formData.formComponents[i];
			if (
				component.type === "label" &&
				i < formData.formComponents.length - 1
			) {
				const nextComponent = formData.formComponents[i + 1];
				console.log(nextComponent);
				const inputTypes = [
					"textarea",
					"checkbox",
					"radiobox",
					"inputfield",
					"checkbox",
				];
				if (inputTypes.includes(nextComponent.type)) {
					component.forAttr = nextComponent.id;
				}
			}
			const formComponent = new FormComponent(component);
			const newComponent = new Component(formComponent.toCreateFormModel());
			components.push(newComponent);
		}
		const form = new FormObject({
			user_id: req.user._id,
			name: formData.formName,
			description: formData.formDescription,
			components: components,
		});
		const newForm = await new Form(form.toCreateFormModel()).save();
		if (fromPage === "create") {
			return res.redirect(`/form/myforms`);
		}
		return res.status(200).json({ formId: newForm._id });
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send(error);
	}
};

const list = async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect("/auth/google");
	}
	return res.render("pages/listform");
};

const viewHistory = async (req, res) => {
  const history_id = req.params.id;

  try{
    const form = await FormHistory.findById(history_id);

		res.render("pages/viewform", { form: form.toJSON() });
  }catch(e){
    return res.status(500).send("Error viewing form");
  }
}

//route "/form/:id" get
const viewForm = async (req, res) => {
	const form_id = req.params.id;
	try {
		const form = await Form.findById(form_id);
    
		res.render("pages/viewform", { form: form.toJSON() });
	} catch (error) {
		return res.status(500).send("Error viewing form");
	}
};

//view responseView
const resForm = async (req, res) => {
	const form_id = req.params.id;

	try {
		const form = await Form.findById(form_id).lean();
		switch (form.status) {
			case "Publish":
				return res.render("pages/responseView", { form: form });
			case "Unpublish":
				return res.render("pages/error", {
					errorType: "FORM NOT FOUND",
					description: "Form is not yet created or it is still in working",
				});
			default:
				return res.render("pages/error", {
					errorType: "FORM CLOSED",
					description:
						"Sorry, but the form is already closed. <br> Contact the owner for further questions",
				});
		}
	} catch (error) {
		return res.render("pages/error", {
			errorType: "FORM NOT FOUND",
			description: "Form is not yet created or it is still in working",
		});
	}
};

const editForm = async (req, res) => {
	/**
	 * Handles the submission of a form.
	 * route "/form/:id/edit" post
	 */

	try {
		const email = req.user.email;
		const form_id = req.params.id;
		const user_id = req.user._id;
		const form = await Form.findOne({
			$and: [
				{ _id: form_id },
				{ $or: [{ authorized_emails: email }, { user_id: user_id }] },
			],
		}).lean();

		if (!form) {
			return res.render("pages/error", {
				errorType: "FORM NOT FOUND",
				description: "Form is not yet created or it is still in working",
			});
		}

		return res.render("pages/editform", { form: form });
	} catch (e) {
		return res.render("pages/error", { message: "No Form Found" });
	}
};

const updateForm = async (req, res) => {
	/**
	 * Handles the edit made in the form
	 * /form/:id/edit postunValidators: true
	 */
	const formData = req.body;
	const components = [];
	const form = await Form.findById(req.params.id);
	try {
		await upsertFormData(formData, form);
		return res.status(200).send("Form updated");
	} catch (e) {
		console.log("Error updating form:", e);
		return res.status(500).send("Error updating form");
	}
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
			return res.status(200).send({ message: "Form deleted" });
		}
		return res.status(404).send("Form not found");
	} catch (error) {
		return res.status(500).send("Error deleting form");
	}
};

// Give Access
const giveAccess = async (req, res) => {
	const email = req.body.email;
	const form_id = req.params.form_id;
	const isValidEmail = validators.isEmail(email);

	if (!isValidEmail) {
		return res.send("Invalid email");
	}

	if (email == req.user.email) {
		return res.send("Cannot add your own email.");
	}

	try {
		await Form.updateOne(
			{ _id: form_id },
			{ $addToSet: { authorized_emails: email } },
			{ new: true }
		);
		res.status(200).send();
	} catch (error) {
		console.error("Error giving access:", error);
		return res
			.status(500)
			.send({ error: "An error occurred while giving access." });
	}
};

//removeAuthEmail
const removeAuthorizedEmail = async (req, res) => {
	/**
	 * Handles the removal of an email from authorized_emails.
	 * Route: POST /form/access/:form_id/removeEmail
	 */

	const email = req.body.email;
	const form_id = req.params.form_id;
	const user_id = req.user._id;

	console.log("email to remove: ", email);
	console.log("form id: ", form_id);
	console.log("user id: ", user_id);

	try {
		const isValidEmail = validators.isEmail(email);

		// Check if email is provided and valid
		if (!isValidEmail) {
			return res.send("Invalid email");
		}
		// Find the form and update it
		const updatedForm = await Form.updateOne(
			{
				_id: form_id,
				user_id: user_id,
			},
			{
				$pull: { authorized_emails: email },
			}
		);

		if (updatedForm.matchedCount === 0) {
			return res.status(404).send("Form not found or user not authorized");
		}
		return res.status(200).send();
	} catch (error) {
		console.error("Error removing email:", error);
		return res
			.status(500)
			.send({ error: "An error occurred while removing the email." });
	}
};

//getAuthEmails
const getAuthorizedEmails = async (req, res) => {
	const form_id = req.params.form_id;
	const variant1 = req.body.variant1;
	console.log("Request", req.body.variant1);
	try {
		const form = await Form.findById(form_id);
		if (!form) {
			return res.status(404).send("Form not found");
		}
		console.log("AUTH NUM: ", form.authorized_emails);
		if (form.authorized_emails == 0) {
			console.log("EXECUTED");
			return res.status(200).send('<div class="font-bold">No editors.</div>');
		}
		return res
			.status(200)
			.send(
				form.authorized_emails
					.map(
						(email) =>
							`<div class="email-item flex justify-between text-md px-2 max-w-full mt-6" ><div class="font-bold text-md w-full overflow-hidden break-all pr-5">${email}</div><button class="remove-email" hx-post="/form/access/${form_id}/removeAuthorizedEmail" hx-vals='js:{"email": "${email}"}' hx-trigger="click" hx-swap="delete" hx-target="closest .email-item"  class="remove-em-btn text-gray-400">Remove</button></div>`
					)
					.join("")
			);
	} catch (error) {
		console.error("Error fetching authorized emails:", error);
		return res
			.status(500)
			.send({ error: "An error occurred while fetching emails." });
	}
};

const deleteAllForms = async (req, res) => {
	try {
		await Form.deleteMany({ user_id: req.user._id });
		return res.status(200).send("All forms deleted");
	} catch (error) {
		console.error("Error deleting forms:", error);
		return res.status(500).send("Error deleting forms");
	}
};

const search = async (req, res) => {
	const search_input = req.body.search;
	let search_forms = [];
	try {
		if (search_input) {
			search_forms = await Form.find({
				$and: [
					{ name: { $regex: search_input, $options: "i" } },
					{ user_id: req.user._id },
				],
			});
		} else {
			search_forms = await Form.find({
				user_id: req.user._id,
			}).sort({ createdAt: -1 });
		}

		const forms = search_forms.map((form) => {
			return {
				id: form._id,
				name: form.name,
				description: form.description,
				date: form.createdAt.toISOString().split("T")[0],
				status: form.status,
			};
		});
		return res.render("components/listcontainer", { forms });
	} catch (error) {
		console.log("Error retrieving forms:", error);
	}
};

//preview
const preview = async (req, res) => {
	res.render(`pages/preview`);
};

const publish = async (req, res) => {
	const form_id = req.params.id;
	// console.log("Form id:", form_id);
	try {
		const form = await Form.findById(form_id);
		let version =
			form.status !== "Closed"
				? form.current_version
				: form.current_version + 1;

		const asd = await FormHistory.create({
			form_id: form._id,
			version: form.version,
			name: form.name,
			description: form.description,
			components: form.components,
			version: version,
		});

		await Form.findByIdAndUpdate(form_id, { status: "Publish" });
		return res.status(200).redirect(`/form/status/${form.id}`);
	} catch (error) {
		console.log("Error opening form:", error);
	}
};

const closeForm = async (req, res) => {
	const form_id = req.params.id;
	console.log("triggered closed form");

	try {
		const form = await Form.findByIdAndUpdate(form_id, { status: "Closed" });
		return res.status(200).redirect(`/form/status/${form.id}`);
	} catch (error) {
		console.log("Error opening form:", error);
	}
};

const errorPage = async (req, res) => {
	res.render(`pages/error`);
};

const getStatus = async (req, res) => {
	const form_id = req.params.id;
	try {
		const form = await Form.findOne({ _id: form_id });

		let color;
		let text;
		switch (form.status) {
			case "Closed":
				color = "text-red-500";
				text = "Close";
				break;
			case "Unpublish":
				color = "text-yellow-500";
				text = "Unpublished";
				break;
			case "Publish":
				color = "text-green-500";
				text = "Open";
				break;
			default:
				color = "";
				text = "";
				break;
		}
		console.log("TRIGGERED");
		const wrapper = `<div class="${color}">${text}</div>`;

		res.status(200).send(wrapper);
	} catch (error) {
		console.log("Error opening form:", error);
	}
};

const getStatusBut = async (req, res) => {
	const form_id = req.params.id;
	try {
		const form = await Form.findOne({ _id: form_id });
		res.render("components/statusButton", {
			stat: form.status,
			id: form._id.toString(),
		});
	} catch (error) {
		console.log("Error opening form:", error);
	}
};

const getFormJson = async (req, res) => {
	const form_id = req.params.id;
	
	try {
		const form = (await Form.findById(form_id, {
			"components.component_type": 1,
			"components.type": 1,
			"components.placeholder": 1,
			"components.options": 1,
			"components.id": 1,
			"components.name": 1,
			"components.content": 1,
			_id: 0,
		})).toObject();
		form.components.forEach((component) => {
			if(component.component_type === "input"){
				component.content = component.placeholder;
				component.placeholder = "";
			}
		});

		return res.status(200).json(form);
	} catch (error) {
		console.log("sdfsdy");
		console.log("Error getting form json", error);
	}
};

export default {
	index,
	getCreatePage,
	submit,
	list,
	editForm,
	viewForm,
	resForm,
	updateForm,
	preview,
	deleteAllForms,
	deleteForm,
	removeAuthorizedEmail,
	getAuthorizedEmails,
	giveAccess,
	search,
	publish,
	closeForm,
	errorPage,
	getStatus,
	getStatusBut,
	getFormJson,
  viewHistory
};
