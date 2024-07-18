import Response from "../models/response.model.js";
const submitResponse = async (req, res) => {
  const formId = req.params.id;
  const userId = req.user._id;
  const responses = req.body;
  await new Response({
    form_id: formId,
    user_id: userId,
    responses: responses,
  }).save();
  res.status(200).send("Response submitted successfully");
};
