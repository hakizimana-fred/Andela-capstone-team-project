import { Application, Request, Response, Router  } from "express";

const router = Router()

router.post('/api/user/signup', (req: Request, res: Response) => {
    try {
        const { email, password} = req.body
        
    }catch(err) {
        console.log(err.message)
    }


})