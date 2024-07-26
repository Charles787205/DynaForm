import mongoose from "mongoose";
const Schema = mongoose.Schema;

const option = { discriminatorKey: "component_type", timestamps: true };

const components = new Schema(
	{
		component_type: {
			type: String,
			required: [true, "Component type is required"],
			enum: {
				values: ["text", "input", "divider", "option"],
				message: "{VALUE} is not supported",
			},
		},
		content: {
			type: Schema.Types.Mixed,
			required: false,
			maxLength: 255,
		},
		id: {
			type: String,
			required: false,
			maxLength: 50,
		},
		name: {
			type: String,
			required: false,
			maxLength: 50,
		},
	},

	option
);

const Component = mongoose.model("Component", components);

Component.discriminator(
	"option",
	new Schema({
		type: {
			type: String,
			required: false,
			enum: ["dropdown", "checkbox", "radiobox"],
		},
		options: {
			type: [String],
			required: false,
		},
	})
);
// text component schema
Component.discriminator(
	"text",
	new Schema({
		type: {
			type: String,
			required: false,
			enum: ["heading", "label", "textfield"],
		},
		forAttr: {
			type: String,
			required: false,
			maxLength: 50,
		},
	})
);

// input component schemas
Component.discriminator(
	"input",
	new Schema({
		type: {
			type: String,
			required: true,
			enum: ["textarea", "inputfield"],
		},
		placeholder: {
			type: String,
			required: false,
			maxLength: 50,
		},
		focus: {
			type: Boolean,
			required: false,
		},
	})
);
Component.discriminator(
	"divider",
	new Schema({
		type: {
			type: String,
			required: true,
			enum: ["divider"],
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
