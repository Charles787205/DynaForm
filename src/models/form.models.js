import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { Component } from "./component.model.js";

const form_schema = new Schema(
	{
		userID: {
			type: String,
			required: [true, "User ID is required"],
			maxLength: 50,
			ref: "User",
		},
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

const Form = mongoose.model("Form", form_schema);

export default Form;
