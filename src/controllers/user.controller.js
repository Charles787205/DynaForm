const login = (req, res) => {
  res.redirect("auth/google");
};

export default {
  login,
};
