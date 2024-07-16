const checkPath = (req, res, next) => {
  const freePaths = ["/auth/google", "/auth/google/callback", "/", "create/"];
  if (
    !freePaths.includes(req.path) &&
    !req.isUnauthenticated() &&
    req.path == "POST"
  ) {
    return res.redirect("/auth/google");
  } else {
    next();
  }
};

export default checkPath;
