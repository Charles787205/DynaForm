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
    this.name = name;
    this.content = content;
    this.type = type;
    this.classes = classes;
    this.className = className;
    this.placeHolder = placeHolder;
    this.focus = focus;
    (this.required = required), (this.checked = checked);
  }
}

export default FormComponent;
