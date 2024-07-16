import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";
import passport from "passport";
import session from "express-session";
import checkPath from "./src/middleware/middleware.js";

import googlePassport from "passport-google-oauth20";

// app.js (or index.js)
import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set the view engine to ejs
app.set("views", "src/views"); // Set the views directory1

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dxfcv",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());

app.use(passport.authenticate("session"));
app.use(passport.session());
app.use(express.static("public"));
app.use(express.json());
app.use(function (req, res, next) {
  res.locals.isLogin = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
app.all("*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", req.path); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Custom-Header"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
});
app.get("*/*", router);
app.post("*/*", router);
app.get("*/*", authRouter);
app.post("*/*", authRouter);
app.delete("*/*", router);

app.use(express.urlencoded({ extended: true | false }));

// Database Connection with mongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for request only after connecting to MongoDB
    app.listen(process.env.PORT, (error) => {
      if (!error) {
        console.log(
          "Server is connected to MongoDB & running on port",
          process.env.PORT
        );
      } else {
        console.log(`Error ${error}`);
      }
    });
  })
  .catch((error) => console.log(error));
