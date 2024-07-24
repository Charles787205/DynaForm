import Response from "../models/response.models.js";
import FormModel from "../models/form.models.js";
import Form from "../objects/form.js";
const submitResponse = async (req, res) => {
	try {
		const formId = req.params.form_id;
		const userId = req.user._id;
		const responses = req.body;

		const components = [];

		const response = Response.create({
			form_id: formId,
			user_id: userId,
			responses: responses,
		});
		res.status(200).json(response);
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send(error);
	}
};

const getResponseDetails = async (req, res) => {
	//if req headers is content json
	if (req.headers["content-type"] === "application/json") {
		try {
			const response = await Response.findById(req.params.response_id);
			return res.status(200).json(response.responses);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Error viewing response");
		}
	}
	try {
		const response = await Response.findById(req.params.response_id);
		const form = await FormModel.findById(response.form_id);
		console.log(response.toObject().responses);
		const formObject = new Form({
			...form.toObject(),
			responses: response.toObject().responses,
		});

		return res.render("pages/responseDetail", {
			form: formObject,
			response_id: response._id,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).send("Response not found");
	}
};
export default { submitResponse, getSummary };
