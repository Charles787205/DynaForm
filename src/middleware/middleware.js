const checkPath = (req, res, next) => {
  const freePaths = ["/auth/google", "/auth/google/callback", "/", "/create"];
  console.log(req.path);
  if (!freePaths.includes(req.path) && req.isUnauthenticated()) {
    return res.redirect("/auth/google");
  } else {
    next();
  }
};

export default checkPath;
