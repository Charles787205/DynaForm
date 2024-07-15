const get_title = async (req, res) => {
  const { title, description, path, editable } = req.query;

  res.render("../views/components/modal/preview", {
    title: title,
    description: description,
    path: path,
  });
};

export default {
  get_title,
};
