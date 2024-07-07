const get = async (req, res) => {
  res.redirect("/create");
};

const post = async (req, res) => {
  console.log(req.body);
  console.log("hello");
  res.send(req.body);
  // res.render("index", { message: "hello" });
};

const createForm = async (req, res) => {
  const data = {};

  res.render("index", { data });
};
export default { get, post, createForm };
