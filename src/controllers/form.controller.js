import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/form.js";
import Form from "../models/form.models.js";
const get = async (req, res) => {
  res.redirect("/create");
};

const createForm = async (req, res) => {
  console.log(req.user);
  res.render("pages/create", { layout: "./layouts/main" });
};

const submitForm = async (req, res) => {
  try {
    // Assuming req.body contains the JSON data sent via fetch
    const formData = req.body;

    console.log(formData);

    const components = [];
    formData.formComponents.forEach((component) => {
      const formComponent = new FormComponent(component);

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
    res.status(500).send("Error processing form");
  }
};

const editForm = async (req, res) => {
  const data = {};

  res.render("pages/create", { data });
};

const listForm = async (req, res) => {
  const allForms = await Form.find();
  const forms_id = allForms.map((form) => form._id);
  res.status(200).json({ forms: forms_id });
  // res.render("pages/listform");
};

const viewForm = async (req, res) => {
  const { form_id } = req.query;
  try {
    const get_form = await Form.findById(form_id);
    console.log(get_form.toJSON());

    res.render("pages/viewform", { get_form: get_form.toJSON() });
  } catch (error) {
    console.error("Error retrieving form:", error);
    res.status(500).send("Error retrieving form");
  }
};

export default {
  get,
  createForm,
  submitForm,
  listForm,
  editForm,
  viewForm,
};
