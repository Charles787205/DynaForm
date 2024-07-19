import Response from "../models/response.models.js";

const submitResponse = async (req, res) => {
  const formId = req.params.id;
  const userId = req.user._id;
  const responses = req.body;
  console.log(req.formData);
  console.log(req.body);
};

const getResponse = async (req, res) => {
  const formId = req.params.id;
  const userId = new ObjectId("66960301ed29140e5c586913"); // franco id
};
export default { submitResponse };
