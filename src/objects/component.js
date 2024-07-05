class Component {
  constructor({
    id = "",
    name = "",
    value = "",
    type = "",
    classes = [],
    className = "",
  }) {
    this.name = name;
    this.value = value;
    this.type = type;
    this.classes = classes;
    this.className = className;
  }
}

export default Component;
