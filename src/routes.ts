import { NextFunction, Request, Response, Router } from "express";
import { User } from "./schemas/User.schema";
import bcrypt from "bcryptjs";
import passport from "passport";
import { omit } from 'lodash'

const router = Router();

router.get("/healthcheck", (req, res) => res.send("hi there"));

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    // check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    // register users
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = {
      email,
      password: hash,
    };
    const savedUser = await User.create(newUser);
    const response = omit(savedUser.toJSON(), 'password')
    return res.status(201).json({ success: true, user: response });
  } catch (err: any) {
    console.log(err.message);
  }
});


router.post('/login', function(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', function(err: any, user: any) {
        if (err)
            return next(err);
        const response = omit(user.toJSON(), 'password')
        res.status(200).json({success: true, user: response})
    })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))


export default router;
