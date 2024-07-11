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

  res.render("pages/create", { data });
};

const editForm = async (req, res) => {
  const data = {};

  res.render("pages/create", { data });
};

const listForm = async (req, res) => {
  const data = {};
  res.render("pages/listform");
};

const viewForm = async (req, res) => {
  const data = {};
  res.render("pages/viewform");
};

export default { get, post, createForm, listForm, editForm, viewForm };
