import FormComponent from "../objects/component.js";

import Form from "../models/form.models.js";
import { Component } from "../models/component.model.js";

//form data is form from the edit form (client)
//form is the form from the database
export async function upsertFormData(formData, form) {
  const new_components = [];
  const components = form.components;
  console.log({ formData });
  for (let i = 0; i < formData.formComponents.length; i++) {
    const component = formData.formComponents[i];
    if (component.type === "label" && i < formData.formComponents.length - 1) {
      const nextComponent = formData.formComponents[i + 1];

      if (nextComponent.type == "inputfield") {
        component.forAttr = nextComponent.id;
      }
    }
    const formComponent = new FormComponent(component);
    //const newComponent = new Component(formComponent.toCreateFormModel());
    //new_components.push(newComponent);

    let isUpdate = false;

    //check if component is already in the database
    for (let j = 0; j < components.length; j++) {
      if (component.id === components[j].id) {
        component._id = components[j]._id;
        component.created_at = components[j].created_at;
        new_components.push(
          new Component({
            ...formComponent.toCreateFormModel(),
            _id: components[j]._id,
            created_at: components[j].created_at,
          })
        );
        isUpdate = true;
        //components.splice(j, 1);
        break;
      }
    }
    //if not in database insert new one
    if (!isUpdate) {
      new_components.push(new Component(formComponent.toCreateFormModel()));
    }
  }
  const newForm = {
    name: formData.formName,
    description: formData.formDescription,
    components: new_components,
  };
  await Form.findByIdAndUpdate(form._id, { ...newForm });
}

export default { upsertFormData };
