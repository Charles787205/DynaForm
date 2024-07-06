import FormComponent from "../objects/formComponent.js";
import { v4 as uuidv4 } from "uuid";

let counter = 0;

const getComponent = async (req, res) => {
  const componentName = req.params.name;
  const options = [
    {
      id: uuidv4(),
      className: req.query.class || "",
    },
    req.query,
  ];
  res.render(`components/${componentName}`, { options });
};

const getField = async (req, res) => {
  const componentName = req.params.name;

  const query = req.query;

  res.render(`components/fields/${componentName}`, { query });
};

export default {
  getComponent,
  getField,
};
