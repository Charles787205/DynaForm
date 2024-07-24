import mongoose from "mongoose";
const Schema = mongoose.Schema;

const response_schema = new Schema({
  form_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Form ID is required"],
    ref: "Form",
  },

  responses: [
    {
      component_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Component ID is required"],
      },
      value: {
        type: String,
        required: [false],
      },
    },
  ],
});

const Response = mongoose.model("Response", response_schema);

export default Response;
