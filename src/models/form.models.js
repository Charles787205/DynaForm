import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validators from "validator";
import { Component } from "./component.model.js";

const form_schema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			required: [true, "User ID is required"],
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

		status: {
			type: String,
			required: true,
			default: "Unpublish",
			enum: ["Unpublish", "Publish", "Closed"],
		},

		authorized_emails: {
			type: [String],
			required: false,
		},

		components: [Component.schema],
	},
	{
		timestamps: true,
	}
);

const Form = mongoose.model("Form", form_schema);

export default Form;
