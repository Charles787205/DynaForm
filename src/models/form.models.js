import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { Component } from "./component.model.js";

const form_schema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			maxLength: 50,
		},
		description: {
			type: String,
			required: false,
			maxLength: 255,
		},
		components: [Component.schema],
	},
	{
		timestamps: true,
	}
);

const user_form = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		required: [true, "User ID is required"],
		ref: "User",
	},
	forms: [form_schema],
});

const Form = mongoose.model("Form", user_form);

export default Form;
