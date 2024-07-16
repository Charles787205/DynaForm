class FormComponent {
  constructor({
    id = "",
    name = "",
    content = "",
    type = "",
    placeHolder = "",
    forAttr = "",
    focus = false,
    required = false,
  }) {
    this.forAttr = forAttr;
    this.id = id;
    this.name = name;
    this.content = content;
    this.type = type;
    this.placeHolder = placeHolder;
    this.focus = focus;
    this.required = required;
  }

  toCreateFormModel = function () {
    const inputTypes = [
      "textarea",
      "checkbox",
      "radiobox",
      "inputfield",
      "checkbox",
      "dropdown",
    ];
    const textTypes = ["heading", "label", "textfield"];
    const button = ["button"];
    const divider = ["divider"];
    if (inputTypes.includes(this.type)) {
      return {
        component_type: "input",
        name: this.name,

        type: this.type,
        content: "",
        focused_bool: false,
        id: this.id,
        placeholder: this.content,
      };
    } else if (textTypes.includes(this.type)) {
      const component = {
        component_type: "text",
        name: this.name,

        type: this.type,
        content: this.content,
        id: this.id,
      };
      if (this.type === "label") {
        component.forAttr = this.forAttr;
      }
      return component;
    } else if (button.includes(this.type)) {
      return {
        component_type: "input",
        type: "submit",
        name: this.name,
        id: this.id,
        content: this.content,
      };
    } else if (divider.includes(this.type)) {
      return {
        component_type: "divider",
        type: "divider",
        name: this.name,
        id: this.id,
        content: this.content,
      };
    } else {
      console.log("Invalid type");
    }
  };
}

export default FormComponent;
