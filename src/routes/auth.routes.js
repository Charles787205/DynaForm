import { Router } from "express";
import User from "../models/user.model.js";
const authRouter = new Router();
import passport from "passport";
import googlePassport from "passport-google-oauth20";

import dotenv from "dotenv";

dotenv.config();

passport.use(
  new googlePassport.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      //diri i save ang user sa database

      const query = User.findOne({ google_id: profile.id });

      query.exec().then((user) => {
        if (user) {
          user.accessToken = accessToken;
          user.save().then((user) => {});
        } else {
          const newUser = new User({
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            img_url: profile.photos[0].value,
            accessToken: accessToken,
          });
          newUser.save().then((user) => {
            console.log("user registered");
          });
        }
      });

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ google_id: id });
  return done(null, user);
});

authRouter.get("/auth/google", (req, res, next) => {
  // Store the original URL in session
  req.session.returnTo = req.query.returnTo || '/';
  console.log("Prev URL: ", req.session.returnTo);
  next(); // Proceed to Google OAuth authentication
});


// Initiates the Google OAuth 2.0 authentication flow
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


// Callback URL for handling the OAuth 2.0 response
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const redirectUrl = req.session.returnTo;
    delete req.session.returnTo; // Clear returnTo session variable
    res.redirect(redirectUrl);
  }
);

// Logout route
authRouter.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    return res.redirect("/");
  });
});

export default authRouter;
