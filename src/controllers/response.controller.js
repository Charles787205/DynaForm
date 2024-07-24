import Response from "../models/response.models.js";
import FormModel from "../models/form.models.js";
import Form from "../objects/form.js";

const submitResponse = async (req, res) => {
  try {
    const formId = req.params.form_id;
    // const userId = req.user._id; << - ERROR WHEN USER NOT LOGGED IN AND SUBMITTED RESPONSE. REMOVED
    const responses = req.body;

    const components = [];

    const response = await new Response({
      form_id: formId,
      //user_id: userId,  << - ERROR WHEN USER NOT LOGGED IN AND SUBMITTED RESPONSE. REMOVED
      responses: responses,
    }).save();

    res.status(200).json({ response_id: response._id });
  } catch (error) {
    console.error("Error processing form:", error);
    return res.status(500).send(error);
  }
};

const getResponseDetails = async (req, res) => {
  //if req headers is content json
  if (req.headers["content-type"] === "application/json") {
    try {
      const response = await Response.findById(req.params.response_id);
      return res.status(200).json(response.responses);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error viewing response");
    }
  }
  try {
    const response = await Response.findById(req.params.response_id);
    const form = await FormModel.findById(response.form_id);
    console.log(response.toObject().responses);
    const formObject = new Form({
      ...form.toObject(),
      responses: response.toObject().responses,
    });

    return res.render("pages/responseDetail", {
      form: formObject,
      response_id: response._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send("Response not found");
  }
};

const getFeedback = (req, res) => {
  const url = "/response/r/" + req.params.response_id;
  res.render("pages/thankyou", { response_url: url });
};

const getResponse = (req, res) => {
  const url = "/response/r/" + req.params.response_id;
  res.render("pages/thankyou", { response_url: url });
};
const getSummary = (req, res) => {
  const formId = req.params.form_id;
  console.log("FORM ID:", formId);
  res.render("pages/response/summary.ejs", { formId } );
};


export default { submitResponse, getResponseDetails, getFeedback, getSummary };
