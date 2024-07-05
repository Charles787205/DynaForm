import mongoose from "mongoose";
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    component: [{ type: Schema.Types.ObjectId, ref: "Component" }],
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

export default { Form };
