class Form {
  constructor({
    id = "",
    name = "",
    description = "",
    components = [],
    google_id = "",
    user_id = "",
    is_active = false,
    authorized_emails = [],
    responses = [],
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.components = components;
    this.google_id = google_id;
    this.user_id = user_id;
    this.is_active = is_active;
    this.authorized_emails = this.authorized_emails;
    this.responses = responses;
  }
  toCreateFormModel() {
    return {
      name: this.name,
      description: this.description,
      components: this.components,
      user_id: this.user_id,
      is_active: this.is_active,
      authorized_emails: [], //temporary
    };
  }
  toResponseFormDetail() {
    this.components.forEach((component) => {
      this.responses.forEach((response) => {
        if (component._id == response.component_id.toString()) {
          component.response = response.value;
        }
      });
    });
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      components: this.components,
    };
  }
}

export default Form;
