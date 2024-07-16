const checkPath = (req, res, next) => {
  const unAuthorizedPaths = [
    "/auth/google",
    "/auth/google/callback",
    "/",
    "create/",
  ];
  next();
};

export default checkPath;
