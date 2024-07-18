//Reponse Page
const submitResponse = async (req, res) => {
	const form_id = req.params.id; // either params or body
	const user_id = new ObjectId("66960301ed29140e5c586913"); // franco id ...  this should be id of the user that is currently login
	const responses = req.body; // array of objects [{component_id, value}]. component id should be object ID

	res.render("pages/response");
};

//Input Reponse
const getResponse = async (req, res) => {
	const typeName = req.params.name;
	res.render(`components/fields/${typeName}`);
};
