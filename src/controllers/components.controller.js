import Component from "../objects/Component.js";

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

  const options = {
    fontSize: req.query.fontSize || "100pt",
    placeholder: req.query.placeholder || "",
    focus: req.query.focus || false,
  };
  const component = new Component({
    id: req.query.id,
    name: req.query.name,
    value: req.query.value,
    type: req.query.type,
    className: req.query.className,
  });
  res.render(`components/fields/${componentName}`, { component, ...options });
};

export default {
  getComponent,
  getField,
};
