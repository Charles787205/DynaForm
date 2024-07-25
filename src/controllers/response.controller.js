import Response from "../models/response.models.js";
import FormModel from "../models/form.models.js";
import Form from "../objects/form.js";
import mongoose from "mongoose";
import { resolveShowConfigPath } from "@babel/core/lib/config/files/index.js";

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
		const find_response = await Response.find({ form_id: formId });
		console.log(find_response);
		const responses = await FormModel.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(formId) } },
			{ $unwind: { path: "$components", includeArrayIndex: "componentIndex" } },
			{
				$lookup: {
					from: "responses",
					let: { componentId: "$components._id", formId: "$_id" },
					pipeline: [
						{ $unwind: "$responses" },
						{
							$match: {
								$expr: {
									$and: [
										{ $eq: ["$form_id", "$$formId"] },
										{ $eq: ["$responses.component_id", "$$componentId"] },
									],
								},
							},
						},
						{ $project: { _id: 0, value: "$responses.value" } },
					],
					as: "matchedResponses",
				},
			},
			{
				$group: {
					_id: "$components._id",
					component: { $first: "$components" },
					responses: { $push: "$matchedResponses.value" },
					componentIndex: { $first: "$componentIndex" },
				},
			},

			{
				$project: {
					_id: 0,
					component: 1,
					responses: 1,
					componentIndex: 1,
				},
			},
			{
				$sort: { componentIndex: 1 },
			},
		]);

		if (!responses.length) {
			console.log("No responses found for this form.");
			return res
				.status(404)
				.json({ message: "No responses found for this form." });
		}
		const summary = responses.map(({ component, responses }) => ({
			component: {
				id: component._id,
				type: component.component_type,
				content: component.content,
				name: component.name,
			},
			responses,
		}));

		console.log(JSON.stringify(summary));

		return res.render("pages/response", { formId, summary: summary });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error." });
	}
};

export default { submitResponse, getSummary, getResponseDetails };

// if (component.type === input) {
// }
