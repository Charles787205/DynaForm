import Response from "../models/response.models.js";
import FormModel from "../models/form.models.js";
import Form from "../objects/form.js";
import mongoose from "mongoose";

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

const getSummary = async (req, res) => {
  try {
    const formId = req.params.form_id;

    const form = await FormModel.findById(formId);
    if (!form) {
      console.log("Form not found.");
      return res.status(404).json({ message: "Form not found." });
    }
    const total_response = await Response.find({ form_id: formId });
    const responses = await FormModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(formId) } },
      { $unwind: { path: "$components", includeArrayIndex: "componentIndex" } },
      {
        $lookup: {
          from: "responses",
          let: { componentId: "$components._id", formId: "$_id" },
          pipeline: [
            { $unwind: "$responses" },
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$form_id", "$$formId"] },
                    { $eq: ["$responses.component_id", "$$componentId"] },
                  ],
                },
              },
            },
            { $project: { _id: 0, value: "$responses.value" } },
          ],
          as: "matchedResponses",
        },
      },
      {
        $facet: {
          labels: [
            { $match: { "components.type": "label" } },
            {
              $project: {
                _id: 0,
                component: "label",
                componentIndex: 1,
                placeholder: "$components.content",
                responses: "$$REMOVE",
              },
            },
          ],
          dropdown: [
            { $match: { "components.type": "dropdown" } },
            {
              $unwind: "$matchedResponses",
            },
            {
              $group: {
                _id: "$matchedResponses.value",
                total: { $sum: 1 },
                componentType: { $first: "$components.type" },
                componentIndex: { $first: "$componentIndex" },
                options: { $first: "$components.options" },
              },
            },
            {
              $group: {
                _id: "$componentIndex",
                componentType: { $first: "$componentType" },
                componentIndex: { $first: "$componentIndex" },
                options: { $first: "$options" },
                responses: {
                  $push: {
                    options: "$_id",
                    total: "$total",
                  },
                },
                totalResponses: { $sum: 1 },
              },
            },
            {
              $addFields: {
                totalResponses: { $sum: "$responses.total" },
              },
            },
            {
              $addFields: {
                responses: {
                  $map: {
                    input: "$responses",
                    as: "response",
                    in: {
                      options: "$$response.options",
                      total: "$$response.total",
                      percentage: {
                        $round: [
                          {
                            $multiply: [
                              {
                                $divide: [
                                  "$$response.total",
                                  "$totalResponses",
                                ],
                              },
                              100,
                            ],
                          },
                          2,
                        ],
                      },
                    },
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                component: "$componentType",
                componentIndex: 1,
                options: 1,
                responses: 1,
                totalResponses: 1,
              },
            },
          ],
          others: [
            {
              $match: {
                "components.type": {
                  $in: ["radiobox", "checkbox", "textarea", "inputfield"],
                },
              },
            },
            {
              $group: {
                _id: "$components._id",
                component: { $first: "$components.type" },
                responses: { $push: "$matchedResponses.value" },
                placeholder: { $first: "$components.placeholder" },
                componentIndex: { $first: "$componentIndex" },
              },
            },
            {
              $project: {
                _id: 0,
                component: 1,
                componentIndex: 1,
                placeholder: 1,
                responses: {
                  $cond: {
                    if: {
                      $in: ["$component", ["radiobox", "checkbox"]],
                    },
                    then: {
                      true_value: {
                        $size: {
                          $filter: {
                            input: {
                              $arrayElemAt: ["$responses", 0],
                            },
                            as: "response",
                            cond: { $eq: ["$$response", "true"] },
                          },
                        },
                      },
                      false_value: {
                        $size: {
                          $filter: {
                            input: {
                              $arrayElemAt: ["$responses", 0],
                            },
                            as: "response",
                            cond: { $eq: ["$$response", "false"] },
                          },
                        },
                      },
                      total_responses: {
                        $size: {
                          $filter: {
                            input: {
                              $arrayElemAt: ["$responses", 0],
                            },
                            as: "response",
                            cond: {
                              $in: ["$$response", ["true", "false"]],
                            },
                          },
                        },
                      },
                    },
                    else: {
                      $cond: {
                        if: { $in: ["$component", ["textarea", "inputfield"]] },
                        then: {
                          $slice: [{ $arrayElemAt: ["$responses", 0] }, 3],
                        },
                        else: "$responses",
                      },
                    },
                  },
                },
                percentage_true: {
                  $cond: {
                    if: {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: { $arrayElemAt: ["$responses", 0] },
                              as: "response",
                              cond: { $eq: ["$$response", "true"] },
                            },
                          },
                        },
                        0,
                      ],
                    },
                    then: {
                      $round: [
                        {
                          $multiply: [
                            {
                              $divide: [
                                {
                                  $size: {
                                    $filter: {
                                      input: {
                                        $arrayElemAt: ["$responses", 0],
                                      },
                                      as: "response",
                                      cond: { $eq: ["$$response", "true"] },
                                    },
                                  },
                                },
                                {
                                  $size: {
                                    $filter: {
                                      input: {
                                        $arrayElemAt: ["$responses", 0],
                                      },
                                      as: "response",
                                      cond: {
                                        $in: ["$$response", ["true", "false"]],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                            100,
                          ],
                        },
                        2,
                      ],
                    },
                    else: 0,
                  },
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          components: { $concatArrays: ["$labels", "$dropdown", "$others"] },
        },
      },
      { $unwind: "$components" },
      { $replaceRoot: { newRoot: "$components" } },
      { $sort: { componentIndex: 1 } },
    ]);
    console.log(responses);
    if (!total_response) {
      console.log("No responses found for this form.");
      return res
        .status(404)
        .json({ message: "No responses found for this form." });
    }
    const response_list = await Response.find({ form_id: req.params.form_id });
    console.log("RESPOSNELLIST: ", response_list);
    return res.render("pages/response/summary.ejs", {
      formId,
      status: form.status,
      authorized_emails: form.authorized_emails,
      title: form.name,
      summary: responses,
      total_response: total_response.length,
      response_list,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const getResponseFromComponents = (req, res) => {
  const response_list = Response.find({ form_id: req.params.form_id });
};

const getResponseList = (req, res) => {
  const response_list = Response.find({ form_id: req.params.form_id });
};
const getFeedback = (req, res) => {
  const url = "/response/r/" + req.params.response_id;
  res.render("pages/thankyou", { response_url: url });
};
const deleteResponse = async (req, res) => {
  const responseId = req.params.response_id;

  if (!req.isAuthenticated()) {
    res.redirect("/auth/google");
  }
  try {
    const deleteRes = await Response.deleteOne({ _id: responseId });
    if (deleteRes) {
      return res.status(200).send();
    }
    return res.status(404).send("Response not found");
  } catch (error) {
    res.status(500).send("Error deleting form");
  }

  res.render("pages/thankyou", { response_url: url });
};
export default {
  submitResponse,
  getResponseDetails,
  getFeedback,
  getSummary,
  deleteResponse,
};
