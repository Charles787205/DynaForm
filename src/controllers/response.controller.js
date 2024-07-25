import Response from "../models/response.models.js";
import FormModel from "../models/form.models.js";
import Form from "../objects/form.js";
import mongoose from "mongoose";

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

const getSummary = async (req, res) => {
	try {
		const formId = req.params.form_id;

		const form = await FormModel.findById(formId);
		if (!form) {
			console.log("Form not found.");
			return res.status(404).json({ message: "Form not found." });
		}

		const responses = await Response.aggregate([
			{ $match: { form_id: new mongoose.Types.ObjectId(formId) } },
			{ $unwind: "$responses" },
			{
				$lookup: {
					from: "forms",
					let: { componentId: "$responses.component_id" },
					pipeline: [
						{
							$match: {
								$expr: { $in: ["$$componentId", "$components._id"] },
							},
						},
						{ $unwind: "$components" },
						{
							$match: {
								$expr: { $eq: ["$$componentId", "$components._id"] },
							},
						},
						{
							$project: {
								_id: "$components._id",
								type: "$components.component_type",
								content: "$components.content",
								name: "$components.name",
							},
						},
					],
					as: "componentDetails",
				},
			},
			{ $unwind: "$componentDetails" },
			{
				$group: {
					_id: "$responses.component_id",
					component: { $first: "$componentDetails" },
					responses: { $push: "$responses.value" },
				},
			},

			{
				$project: {
					_id: 1,
					component: 1,
					responses: 1,
				},
			},
		]);

		if (!responses.length) {
			console.log("No responses found for this form.");
			return res
				.status(404)
				.json({ message: "No responses found for this form." });
		}

		const summary = {
			formId: form._id,
			responses: responses.map(({ component, responses }) => ({
				component: {
					id: component._id,
					type: component.type,
					content: component.content,
					name: component.name,
				},
				responses,
			})),
		};

		console.log(summary);
		res.status(200).json(summary);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error." });
	}
};

export default { submitResponse, getSummary, getResponseDetails };
