import passport from "passport";
import googlePassport from "passport-google-oauth20";

passport.use(
  new googlePassport.GoogleStrategy(
    {
      clientId: process.env("GOOGLE_CLIENT_ID"),
      clientSecret: process.env("GOOGLE_CLIENT_SECRET"),
      callbackURL: process.env("GOOGLE_CALLBACK_URL"),
    },
    (accessToken, refreshToken, profile, done) => {
      // Code to handle user authentication and retrieval
    }
  )
);

passport.serializeUser((user, done) => {
  // Code to serialize user data
});

passport.deserializeUser((id, done) => {
  // Code to deserialize user data
});
