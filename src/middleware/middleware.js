const checkPath = (req, res, next) => {
  const freePaths = ["/auth/google", "/auth/google/callback", "/", "/create"];
  console.log(req.rawHeaders.includes("HX-Request"));
  if (
    !freePaths.includes(req.path) &&
    req.isUnauthenticated() &&
    !req.rawHeaders.includes("HX-Request")
  ) {
    return res.redirect("/auth/google");
  } else {
    next();
  }
};

export default checkPath;
