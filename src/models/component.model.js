import mongoose from "mongoose";
const Schema = mongoose.Schema;

const componentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});

const Component = mongoose.model("Component", componentSchema);

export default { Component };
