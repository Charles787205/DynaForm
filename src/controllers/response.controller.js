import Response from "../models/response.models.js";
import { Component } from "../models/component.model.js";
import { ObjectId } from "mongodb";
import Form from "../models/form.models.js";
import { response } from "express";
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

const getSummary = async (req, res) => {
	const formId = req.params.form_id;
	try {
		const response = await Response.find({ form_id: formId }, { responses: 1 });
		const form = await Form.findById(formId);

		console.log(form.components);
		const responses = response.map((r) => r.responses);
		const values = responses.map((r) => r.map((v) => v.value));
		const final_values = values.flat();
		console.log("responses: ", final_values);

		return res.render("pages/response", {
			responses: final_values,
			form: form,
		});
	} catch (error) {
		console.error("Error processing form:", error);
		return res.status(500).send();
	}
};
export default { submitResponse, getSummary };
