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
			console.log(accessToken);
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

// Initiates the Google OAuth 2.0 authentication flow
authRouter.get(
	"/auth/google",
	(req, res, next) => {
		req.session.returnTo = req.query.returnTo || req.headers.referer || "/";
		req.session.save();
		console.log(req.session);
		next();
	},
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback URL for handling the OAuth 2.0 response
authRouter.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		keepSessionInfo: true,
		failureRedirect: "/",
	}),
	(req, res) => {
		const redirectTo = req.session.returnTo || "/create";
		console.log(req.session);
		delete req.session.returnTo;
		res.redirect(redirectTo);
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
