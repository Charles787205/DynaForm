import FormComponent from "../objects/formComponent.js";
import { v4 as uuidv4 } from "uuid";
let counter = 0;

const getComponent = async (req, res) => {
	const componentName = req.params.name;
	const options = {
		id: uuidv4(),
		...req.query,
	};
	res.render(`components/${componentName}`, { options });
};

const getField = async (req, res) => {
	const componentName = req.params.name;
	const query = {
		id: uuidv4(),
		...req.query,
	};

	res.render(`components/fields/${componentName}`, { query });
};

// return the modal that holds the components for the form
const getModal = async (req, res) => {
	res.render("components/modal");
};
export default {
	getComponent,
	getField,
	getModal,
};
