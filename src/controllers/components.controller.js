import { v4 as uuidv4 } from "uuid";

const getComponent = async (req, res) => {
  const componentName = req.params.name;
  const options = {
    id: uuidv4(),
    ...req.query,
  };
  res.render(`components/${componentName}`, { options });
};

const getField = async (req, res) => {
  const componentName = req.params.name;
  const query = {
    id: uuidv4(),
    ...req.query,
  };

  res.render(`components/fields/${componentName}`, { query });
};

const getTemplate = async (req,res) => {
  const template = req.params.template;

  res.render(`template/${template}`)
}

// return the modal that holds the components for the form
const getModal = async (req, res) => {
  res.render("components/modal");
};

const designModal = async (req, res) => {
  const modals = req.params.modals;
  const { button, description, path } = req.query;
  console.log(button, description, path);
  res.render(`components/modal/${modals}`, {button, description, path});
};

export default {
  getComponent,
  getField,
  getModal,
  getTemplate,
  designModal
};
