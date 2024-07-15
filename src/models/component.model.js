import mongoose from "mongoose";
const Schema = mongoose.Schema;

const option = { discriminatorKey: "component_type" };

const components = new Schema(
  {
    component_type: {
      type: String,
      required: [true, "Component type is required"],
      enum: {
        values: ["text", "input"],
        message: "{VALUE} is not supported",
      },
    },
    element_id: {
      type: String,
      required: true,
      required: [true, "Element id is required"],
    },
    content: {
      type: String,
      required: false,
      maxLength: 255,
    },
    className: {
      type: String,
      required: false,
      maxLength: 50,
    },
  },
  option
);

const Component = mongoose.model("Component", components);

// text component schema
Component.discriminator(
  "text",
  new Schema({
    type: {
      type: String,
      required: false,
      enum: ["title", "heading", "smalltext"],
    },
  })
);

// input component schemas
Component.discriminator(
  "input",
  new Schema({
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    type: {
      type: String,
      required: false,
      enum: ["text", "number"],
    },
    placeholder: {
      type: String,
      required: true,
      maxLength: 50,
    },
    input_type: {
      type: String,
      required: true,
      maxLength: 50,
    },
    focused_bool: {
      type: Boolean,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
    },
  })
);
Component.discriminator("divider", new Schema({}));

Component.discriminator(
  "button",
  new Schema({
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    type: {
      type: String,
      required: true,
      enum: ["submit", "reset"],
    },
  })
);

export { Component };
