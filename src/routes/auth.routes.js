import { Router } from "express";

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
			//console.log(profile);
			//diri i save ang user sa database
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	// Code to serialize user data
});

passport.deserializeUser((id, done) => {
	// Code to deserialize user data
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
		console.log(req);
		res.redirect("/");
	}
);

// Logout route
authRouter.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

export default authRouter;
