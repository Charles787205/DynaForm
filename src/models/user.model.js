import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		accessToken: {
			type: String,
			required: true,
		},
		img_url: {
			type: String,
		},
		google_id: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema);
