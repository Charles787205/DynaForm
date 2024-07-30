import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validators from "validator";
import { Component } from "./component.model.js";

const form_history_schema = new Schema(
	{
		form_id: {
			type: Schema.Types.ObjectId,
			required: [true, "Form ID is required"],
			ref: "Form",
		},
		version: {
			type: Number,
			required: [true, "Version is required"],
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

const FormHistory = mongoose.model("FormHistory", form_history_schema);

export default FormHistory;
