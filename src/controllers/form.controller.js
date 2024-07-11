const get = async (req, res) => {
	res.redirect("/create");
};

const post = async (req, res) => {
	console.log(req.body);
	console.log("hello");
	res.send(req.body);
};

const createForm = async (req, res) => {
	const data = {};

	res.render("index", { data });
};
export default { get, post, createForm };

// const createForm = async (req, res) => {
// 	const { name, description, components } = req.body;

// 	try {
// 		const create = await Form.create({
// 			name,
// 			description,
// 			components,
// 		});
// 		res.status(200).json(create);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// };
