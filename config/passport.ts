const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const googleOpts = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/user/google/redirect"
};
passport.serializeUser((user: UserI, done: Function) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: string, done: Function) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
module.exports = passport.use(
  new GoogleStrategy(
    googleOpts,
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      const { familyName }: { familyName: string } = profile.name;
      const { givenName }: { givenName: string } = profile.name;
      const picture: string = profile.photos[0].value;
      const email: string = profile.emails[0].value;
      const { id }: { id: string } = profile;
      const role: string = email.includes("ubiqum") ? "Admin" : "User";
      User.findOne({ googleId: id }, async (error: Error, user: any) => {
        if (error !== null) {
          done(error, null);
        } else if (user === null) {
          console.log("user does not exist");
          const newUser = new User({
            googleId: id,
            name: givenName,
            surname: familyName,
            email,
            picture,
            role
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        } else {
          // console.log("user exists");
          // const savedUser = await user.save();
          done(null, user);
        }
      });
    }
  )
);
