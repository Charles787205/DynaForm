import { v4 as uuidv4 } from "uuid";
import { texts, inputs } from "../data/fields.js";

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

const showComponentPreview = async (req, res) => {
  console.log("preview: ", req.body );

  res.render("components/modal/preview", { ...req.body, view: true });
};

export default {
	getComponent,
	getField,
	showModal,
	getTemplate,
	showComponentPreview,
};
