import express, { Request, Response,NextFunction} from "express";
import Authenticate from './Auth'
import usermodel from "../models/users";
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userhandler = new usermodel; 

const index = async (req: Request, res: Response) => {
    try {
       const users = await userhandler.index();
       res.json(users);
    } catch (error) {
       res.status(400).send(error)
    }
   };

   const show =async (req: Request, res: Response) => {
    try {
        const userid = req.params.id as unknown as string
        const showUser = await userhandler.show(userid)
        res.json(showUser);
    } catch (error) {
        res.status(400)
    }
}; 


const signup = async (req: Request, res: Response) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname:req.body.lastname
    }
    try {
        const newUser = await userhandler.create(userData)
        var token = jwt.sign({ userData: newUser }, process.env.tokenSecret as Secret);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(userData)
    }
};

const login = async (req: Request, res: Response) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname:req.body.lastname
        }
        try {
            const u = await userhandler.authenticate(userData.username, userData.password)
            var token = jwt.sign({ userData: u }, process.env.tokenSecret as Secret);
            res.json(token)
        } catch(error) {
            res.status(401)
            res.json({ error })
        }
    };


    const update = async (req: Request, res: Response) => {
        const userData = {
            username: req.body.username,
            password: req.body.password,
        }
        const id = parseInt(req.params.id)
        try {
            const updated = await userhandler.update(userData,id)
            res.json(updated)
        } catch(err) {
            res.status(400)
        }
    }; 


    const deleteuser =async (req: Request, res: Response) => {
        try {
            const userid = req.params.id as unknown as string
            await userhandler.delete(userid)
            res.json(`user is successfully deleted`);
        } catch (error) {
            res.status(400)
        }
    }; 
    






const userRoutes = (app: express.Application) => {
    app.get('/users', Authenticate, index)
    app.get('/users/:id', Authenticate, show)
    app.post('/users/create', signup)
    app.post('/users/login', login)
    app.put('/users/:id', Authenticate, update)
    app.delete("/users", Authenticate, deleteuser);
  }
  
  export default userRoutes
  