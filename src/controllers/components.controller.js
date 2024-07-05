import Component from "../objects/Component.js";
const get = async (req, res) => {
  const componentName = req.params.name;

  const component = new Component({
    id: req.query.id,
    name: req.query.name,
    value: req.query.value,
    type: req.query.type,
    className: req.query.className,
  });

  console.log("componentName");
  res.render(`components/${componentName}`, { component });
};

export default {
  get,
};
