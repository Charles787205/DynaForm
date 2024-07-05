import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";
import passport from "passport";
import session from "express-session";
import googlePassport from "passport-google-oauth20";

dotenv.config();

// app.js (or index.js)
import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";

import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.set("view engine", "ejs"); // Set the view engine to ejs
app.set("views", "src/views"); // Set the views directory1

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
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
app.use;

// Database Connection with mongoDB

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     // Listen for request only after connecting to MongoDB
//     app.listen(process.env.PORT, (error) => {
//       if (!error) {
//         console.log(
//           "Server is connected to MongoDB & running on port",
//           process.env.PORT
//         );
//       } else {
//         console.log(`Error ${error}`);
//       }
//     });
//   })
//   .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true | false }));

app.get("*/*", router);
app.post("*/*", router);

app.get("*/*", authRouter);
app.post("*/*", authRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
