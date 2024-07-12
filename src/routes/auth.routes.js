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

      const query = User.findOne({ googleId: profile.id });
      query.exec().then((user) => {
        if (user) {
          console.log("User already exists");
        } else {
          const newUser = new User({
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            img_url: profile.photos[0].value,
            accessToken: accessToken,
          });
          newUser.save().then((user) => {
            console.log(user);
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

passport.deserializeUser((id, done) => {
  return done(null, id);
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
    res.redirect("/");
  }
);

// Logout route
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    return res.redirect("/");
  });
  res.redirect("/");
});

export default authRouter;
