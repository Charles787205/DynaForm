class FormComponent {
	constructor({
		id = "",
		name = "",
		content = "",
		type = "",
		classes = [],
		className = "",
		placeHolder = "",
		focus = false,
		required = false,
	}) {
		this.id = id;
		this.name = name;
		this.content = content;
		this.type = type;
		this.classes = classes;
		this.className = className;
		this.placeHolder = placeHolder;
		this.focus = focus;
		this.required = required;
	}

	toCreateFormModel = function () {
		const inputTypes = [
			"textarea",
			"checkbox",
			"radiobox",
			"inputfield",
			"checkbox",
			"dropdown",
		];
		const textTypes = ["heading", "label", "textfield"];
		const button = ["button", "divider"];
		if (inputTypes.includes(this.type)) {
			return {
				component_type: "input",
				name: this.name,
				className: "",
				input_type: this.type,
				content: "",
				focused_bool: false,
				id: this.id,
				placeholder: this.content,
			};
		} else if (textTypes.includes(this.type)) {
			return {
				component_type: "text",
				name: this.name,
				className: "",
				input_type: this.type,
				content: this.content,
				id: this.id,
			};
		} else if (button.includes(this.type)) {
			return {
				component_type: "input",
				type: "submit",
				name: this.name,
				id: this.id,
				content: this.content,
				className: this.className,
			};
		} else {
			console.log("Invalid type");
		}
	};
}

export default FormComponent;
