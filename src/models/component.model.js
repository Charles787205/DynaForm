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
		content: {
			type: String,
			required: true,
			maxLength: 255,
		},
		className: {
			type: String,
			required: true,
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
			required: true,
			enum: ["Title", "Heading", "SmallText"],
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
			required: true,
			enum: ["Text", "Number"],
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
