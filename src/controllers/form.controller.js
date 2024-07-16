import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/form.js";
import Form from "../models/form.models.js";

//Return Index
const get = async (req, res) => {
<<<<<<< HEAD
	res.redirect("/create");
=======
  res.render("index");
>>>>>>> cd9a2d17d1a7725e4c7069e9534ea40e8ac28450
};

//Form Create Page
const getCreatePage = async (req, res) => {
<<<<<<< HEAD
	res.render("pages/create", { layout: "./layouts/main" });
=======
  res.render("pages/create");
>>>>>>> cd9a2d17d1a7725e4c7069e9534ea40e8ac28450
};

//Form Save to DB
const submit = async (req, res) => {
	if (req.isUnauthenticated()) return res.status(401).send("Unauthorized");
	try {
		const { formName, formDescription, formComponents } = req.body;
		const components = [];

		formComponents.forEach((component) => {
			const formComponent = new FormComponent(component);
			const newComponent = new Component(formComponent.toCreateFormModel());
			components.push(newComponent);
		});

		const form = new FormObject({
			user_id: req.user._id,
			name: formName,
			description: formDescription,
			components: components,
		});

		await new Form(form.toCreateFormModel()).save();
		return res.json({ form });
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send(error);
	}
};
<<<<<<< HEAD
const edit = async (req, res) => {
	const data = {};

	res.render("pages/create", { data });
};

const list = async (req, res) => {
	const allForms = await Form.find({ user_id: req.user._id });
	const forms = allForms.map((form) => {
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
		const get_form = await Form.findById(
			{ form_id },
			{ $where: { user_id: req.user._id } }
		);
		console.log(get_form.toJSON());

		res.render("pages/viewform", { get_form: get_form.toJSON() });
	} catch (error) {
		console.error("Error retrieving form:", error);
		res.status(500).send("Error retrieving form");
	}
=======

//Form List
const list = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/auth/google");
  }

  const allForms = await Form.find({ user_id: req.user._id });
  console.log(req.session);
  console.log(req.user);

  const forms = allForms.map((form) => {
    return {
      id: form._id,
      name: form.name,
      description: form.description,
      date: form.createdAt.toISOString().split("T")[0],
    };
  });

  res.render("pages/listform", { forms });
};

//Form View
const viewForm = async (req, res) => {
  const form_id = req.params.id;
  console.log("form ID: ", form_id);
  try {
    const form = await Form.findById(form_id);
    console.log(form.toJSON());

    res.render("pages/viewform", { form: form.toJSON() });
  } catch (error) {
    console.error("Error retrieving form:", error);
    res.status(500).send("Error retrieving form");
  }
>>>>>>> cd9a2d17d1a7725e4c7069e9534ea40e8ac28450
};

//Form Edit
const editForm = async (req, res) => {
  res.render("pages/editform");
};

//Form Update
const updateForm = async (req, res) => {
  res.send(200, "Form updated");
};

//Reponse Page
const response = async (req, res) => {
  res.render("pages/response");
};

//Input Reponse
const getResponse = async (req, res) => {
  const typeName = req.params.name;
  res.render(`components/fields/${typeName}`);
};

//Delete Form
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
<<<<<<< HEAD
	get,
	getCreatePage,
	submit,
	list,
	edit,
	view,

	deleteAllForms,
	deleteForm,
=======
  get,
  getCreatePage,
  submit,
  list,
  editForm,
  viewForm,
  updateForm,
  response,
  deleteAllForms,
  deleteForm,
>>>>>>> cd9a2d17d1a7725e4c7069e9534ea40e8ac28450
};
