class Form {
  constructor({ id = "", name = "", description = "", components = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.components = components;
  }
  toCreateFormModel() {
    return {
      name: this.name,
      description: this.description,
      components: this.components,
    };
  }
}

export default Form;
