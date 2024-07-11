import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		accessTOken: {
			type: String,
			required: true,
		},
		googleID: {
			type: String,
			required: true,
		},
		img_url: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema);
