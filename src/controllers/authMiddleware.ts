// import express from "express";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";

// import passport from "passport";
// export const authRouter = express.Router();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
//       passReqToCallback: true,
//     },

//     function (
//       request: any,
//       accessToken: any,
//       refreshToken: any,
//       profile: any,
//       done: any
//     ) {
//       //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       //     return done(err, user);
//       //   });
//     }
//   )
// );

// passport.serializeUser((user: any, done: any) => {
//   done(null, user);
// });

// passport.deserializeUser((data: any, done: any) => {
//   done(null, data);
// });

// authRouter.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// authRouter.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/success",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// authRouter.get('/logout', (req, res)=>{
//     req.logout()
//     res.redirect('/')
// })
