import express from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

import passport from "passport";
import { User } from "../schemas/User.schema";
export const authRouter = express.Router();

export const authentication_strategies = {
  googleStrategy: function () {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
          passReqToCallback: true,
        },

        async function (
          request: any,
          accessToken: any,
          refreshToken: any,
          profile: any,
          done: any
        ) {
          console.log(profile, "for now");
        }
      )
    );
  },
  localStrategy: function () {
    passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email: string, password: string, done: Function) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return done(null, false);
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) return done(null, false);
          return done(null, user);
        }
      )
    );
  },
};

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((data: any, done: any) => {
  done(null, data);
});
