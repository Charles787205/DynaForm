import Component from "../controllers/components.controller.js";

const get_title = async (req, res) => {
	const { title, description } = req.query;

	// res.render("../views/components/modal/title.ejs", { title, description });

	res.render("../views/components/modal/title", {
		title: title,
		description: description,
	});
};

export default {
	get_title,
};
