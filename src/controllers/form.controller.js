import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/Form.js";
import Form from "../models/form.models.js";
const get = async (req, res) => {
  res.redirect("/create");
};

const post = async (req, res) => {
  console.log(req.body);
  console.log("hello");
  res.send(req.body);
};

const createForm = async (req, res) => {
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

    new Form(form.toCreateFormModel()).save();

    return res.json({ form });
    res.render("pages/create", { data: formData });
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).send("Error processing form");
  }
};

const editForm = async (req, res) => {
  const data = {};

  res.render("pages/create", { data });
};
``;

const listForm = async (req, res) => {
  const data = {};
  res.render("pages/listform");
};

const viewForm = async (req, res) => {
  const data = {};
  res.render("pages/viewform");
};

export default {
  get,
  post,
  createForm,
  submitForm,
  listForm,
  editForm,
  viewForm,
};
