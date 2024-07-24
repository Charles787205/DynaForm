import Response from "../models/response.models.js";
import { Component } from "../models/component.model.js";
import { ObjectId } from "mongodb";
import Form from "../models/form.models.js";
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

const getResponse = async (req, res) => {
  const formId = req.params.id;
    

	res.render("pages/response", { formId });
};
export default { submitResponse, getResponse };
