import Response from "../models/response.models.js";

const submitResponse = async (req, res) => {
	// const formId = req.params.id;
	// const userId = req.user._id;
	// try {
	// 	const form = await Response.findOne({ form_id: formId, user_id: userId });
	// 	if (form) {
	// 		return res.status(400).send("Response already submitted");
	// 	}
	// 	const response = await new Response({
	// 		form_id: formId,
	// 		user_id: userId,
	// 		responses: responses,
	// 	}).save();
	// 	if (!response) {
	// 		return res.status(400).send("Error submitting response");
	// 	}
	// 	res.status(200).send({ "Response submitted successfully": response });
	// } catch (error) {
	// 	console.error("Error submitting response:", error);
	// }
	console.log("hi");
};

export default { submitResponse };
