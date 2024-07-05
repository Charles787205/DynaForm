import dotenv from "dotenv";
dotenv.config();

// app.js (or index.js)
import express from "express";
import router from "./src/routes/routes.js";
import dbRouter from "./src/routes/dbRoutes.js"; // api routes for db bridge
import mongoose from "mongoose";

import { configDotenv } from "dotenv";

configDotenv();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set the view engine to ejs
app.set("views", "src/views"); // Set the views directory1
app.use(express.static("public"));
app.use(express.json());

app.get("*/*", router);

app.use("/db", dbRouter);

// Database Connection with mongoDB

/*
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
*/

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true | false }));

app.get("*/*", router);
app.post("*/*", router);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
