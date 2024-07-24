/**
 * Middleware function to check if the requested path requires authentication.
 * If the path requires authentication and the user is not authenticated, it redirects to the Google authentication page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const checkPath = (req, res, next) => {
  const freePaths = ["/auth/google", "/auth/google/callback", "/", "/create"];
  const freeDynamicPaths = ["/form/r/"];

  let isInDynamic = false;
  freeDynamicPaths.forEach((path) => {
    if (req.path.includes(path)) {
      isInDynamic = true;
    }
  });
  // console.log(req.rawHeaders.includes("HX-Request"));
  if (
    !isInDynamic &&
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
