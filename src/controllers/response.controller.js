import Response from "../models/response.models.js";
import { Component } from "../models/component.model.js";
import { ObjectId } from "mongodb";
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
		res.render("");
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send(error);
	}
};

const getResponseDetails = async (req, res) => {
	try {
		const response = await Response.findById(req.params.response_id);
		const form = await FormModel.findById(response.form_id);
		console.log(response.toObject().responses);
		const formObject = new Form({
			...form.toObject(),
			responses: response.toObject().responses,
		});
		return res.status(200).json(formObject.toResponseFormDetail());
	} catch (error) {
		console.log(error);
		return res.status(404).send("Response not found");
	}
	if (response) {
	}
};
export default { submitResponse, getResponseDetails };
