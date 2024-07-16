import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { Component } from "./component.model.js";

const form_schema = new Schema(
<<<<<<< HEAD
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
		is_active: {
			type: Boolean,
			required: true,
		},
		is_shared: {
			type: Boolean,
			required: true,
		},
		access_controle: {
			type: String,
			required: false,
			enum: ["public", "private"],
		},

		components: [Component.schema],
	},
	{
		timestamps: true,
	}
=======
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
    components: [Component.schema],
  },
  {
    timestamps: true,
  }
>>>>>>> cd9a2d17d1a7725e4c7069e9534ea40e8ac28450
);

const Form = mongoose.model("Form", form_schema);

export default Form;
