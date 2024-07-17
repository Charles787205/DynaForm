import { Component } from "../models/component.model.js";
import FormComponent from "../objects/component.js";
import FormObject from "../objects/form.js";
import Form from "../models/form.models.js";

//Return Index
const get = async (req, res) => {
  res.render("index");
};

//Form Create Page
const getCreatePage = async (req, res) => {
  res.render("pages/create");
};

//Form Save to DB
const submit = async (req, res) => {
  //if (req.isUnauthenticated()) return res.status(401).send("Unauthorized");
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
      user_id: "66947ce453c1120196b54e8c",
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

//Form List
const list = async (req, res) => {
  //if (!req.isAuthenticated()) {
  //  res.redirect("/auth/google");
  //}

  const allForms = await Form.find({ user_id: "66947ce453c1120196b54e8c" });

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
};
