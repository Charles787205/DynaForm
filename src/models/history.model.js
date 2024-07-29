import { Schema } from "mongoose";

const form_history = new Schema({
	form_id: {
		type: Schema.Types.ObjectId,
		required: [true, "Form ID is required"],
		ref: "Form",
	},
	version: {
		type: Number,
		required: [true, "Version is required"],
	},
	components: [
		{
			component_id: {
				type: Schema.Types.ObjectId,
				required: [true, "Component ID is required"],
			},
			content: {
				type: String,
				required: [true, "Content is required"],
			},
		},
	],
});

const History = mongoose.model("History", form_history);

export default History;
