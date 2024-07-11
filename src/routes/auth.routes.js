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
      console.log(profile);
      //diri i save ang user sa database
      console.log({
        accessToken,
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        username: profile.username,
      });
      /*
      
      const query = User.findOne({ googleId: profile.id });
      query.exec().then((user) => {
        if (user) {
          console.log("User already exists");
        } else {
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            username: profile.username,
          });
          newUser.save().then((user) => {
            console.log("User saved to database");
          });
        }
      });
      */

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
//ya29.a0AXooCgs1-Ag9NByMXE-VZupl4d34P-vwEP5Jb_sTDLJx3qw4Oxm4okTw7lqMzQi1HqivOZW-JiEefejVP0tRyJrKSU4KxKrHiS1sCukDxO0MmNtVWK5UjlskZV-zUOjh8pEiIwkKX5ywoyyTSRxVTQKp5btzNnNfquAtaCgYKAZkSARMSFQHGX2Miq7qgt4YlDldxBi90Pn0LrQ0171
