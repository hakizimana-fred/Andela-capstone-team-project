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
          callbackURL: `/auth/google/callback`,
          passReqToCallback: true,
        },

        async function (
          request: any,
          accessToken: any,
          refreshToken: any,
          profile: any,
          done: Function
        ) {
        
          try {

          const user = await User.findOne({where: {googleID: profile.id}})
          if (!user) {
            const newUser = {
                email: profile.email,
                googleID: profile.id,
            }
            const googleUser = await User.create(newUser)
            done(null, googleUser)
          }else {
            done(null, user)
          }
          }catch(err) {console.log(err)}
        }
      )
    );
  },
  localStrategy: function () {
    passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email: string, password: string, done: Function) => {
            const user: any = await User.findOne({where: {email}})
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(!user) return done(null, false)
            if (!isValidPassword) return done(null, false, {message: "Invalid credentials"})
            return done(null, user)
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
