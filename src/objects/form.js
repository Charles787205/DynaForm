class Form {
  constructor({
    id = "",
    name = "",
    description = "",
    components = [],
    google_id = "",
    user_id = "",
    is_active = false,
    access_control = [],
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.components = components;
    this.google_id = google_id;
    this.user_id = user_id;
    this.is_active = is_active;
    this.access_control = access_control;
  }
  toCreateFormModel() {
    return {
      name: this.name,
      description: this.description,
      components: this.components,
      user_id: this.user_id,
      is_active: this.is_active,
      access_control: this.access_control,
    };
  }
}

export default Form;
