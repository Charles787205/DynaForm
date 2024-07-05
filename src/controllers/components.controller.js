import FormComponent from "../objects/formComponent.js";

const getComponent = async (req, res) => {
  const componentName = req.params.name;
  const options = [
    req.query,
    {
      className: req.query.class || "",
    },
  ];
  res.render(`components/${componentName}`, { ...options });
};

const getField = async (req, res) => {
  const componentName = req.params.name;

  const query = req.query;
  console.log(query);
  res.render(`components/fields/${componentName}`, { query });
};

export default {
  getComponent,
  getField,
};
