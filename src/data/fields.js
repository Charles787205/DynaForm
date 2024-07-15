const texts = [
  {
    title: "Heading",
    description: "This is a normal text description for the heading.",
    example_text: "Heading 1",
    type: "heading",
  },
  {
    title: "Normal Text",
    description: "This is a normal text description for the normal.",
    example_text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "textfield",
  },
  {
    title: "Label",
    description: "This is a normal text description for the normal.",
    example_text: "First Name",
    type: "label",
  },
];

const inputs = [
  {
    title: "Multiple Choices",
    description:
      "Use this block to create radio buttons for different choices.",
    example_text: "Choice",
    type: "radiobox",
  },
  {
    title: "Multi-Select",
    description:
      "Use this for enabling users to select one or more options from a list, allowing for multiple selections, such as agreeing to terms or choosing preferences.",
    example_text: "This is a checkbox",
    type: "checkbox",
  },
  {
    title: "Input Field",
    description: "Use this block to make user input.",
    example_text: "",
    type: "inputfield",
  },
  {
    title: "Long response",
    description: "Use this block to make user input.",
    example_text: "",
    type: "textarea",
  },
  {
    title: "Dropdown",
    description:
      "Use this for allowing users to select multiple options from a dropdown list or a set of choices, such as selecting several categories or tags.",
    example_text: "Option",
    type: "dropdown",
  },
];

export { texts, inputs };
