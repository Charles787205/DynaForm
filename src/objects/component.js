class FormComponent {
  constructor({
    id = "",
    name = "",
    content = "",
    type = "",
    classes = [],
    className = "",
    placeHolder = "",
    focus = false,
    required = false,
  }) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.type = type;
    this.classes = classes;
    this.className = className;
    this.placeHolder = placeHolder;
    this.focus = focus;
    this.required = required;
  }

  toCreateFormModel = function () {
    const inputTypes = [
      "textfield",
      "textarea",
      "checkbox",
      "radiobox",
      "inputfield",
    ];
    const textTypes = ["heading"];
    if (inputTypes.includes(this.type)) {
      return {
        component_type: "input",
        name: this.name,
        className: "",
        input_type: this.type,
        content: "try",
        focused_bool: false,
        placeholder: this.content,
      };
    } else if (textTypes.includes(this.type)) {
      return {
        component_type: "text",
        name: this.name,
        className: "",
        input_type: this.type,
        content: this.content,
      };
    } else {
      console.log("Invalid type");
    }
  };
}

export default FormComponent;
