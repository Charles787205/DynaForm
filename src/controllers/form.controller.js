import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/Form.js";
import Form from "../models/form.models.js";
const get = async (req, res) => {
  res.redirect("/create");
};

const post = async (req, res) => {
  res.send(req.body);
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

const edit = async (req, res) => {
  const data = {};

  res.render("pages/create", { data });
};

const list = async (req, res) => {
  const data = {};
  res.render("pages/listform");
};

const view = async (req, res) => {
  const data = {};
  res.render("pages/viewform");
};

export default {
  get,
  post,
  create,
  submit,
  list,
  edit,
  view,
};
