import { Request, Response, Router } from "express";
import { User } from "./schemas/User.schema";
import bcrypt from "bcryptjs";
import passport from "passport";

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
    return res.status(201).json({ success: true, user: savedUser });
  } catch (err: any) {
    console.log(err.message);
  }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      failureRedirect: '/api/user/login'
    })(req, res, next);
  })


router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))


export default router;
