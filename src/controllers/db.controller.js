import formModels from "../models/formModels.js";

const add = async (req, res) => {
	const { title, component } = req.body;
	try {
		const add = await formModels.create({ title, component });
		console.log(add);
		res.status(200).json({ add });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export default { add };
