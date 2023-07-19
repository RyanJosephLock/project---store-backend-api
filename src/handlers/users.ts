import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/users'
import { verifyAuthToken } from '../middlewares/verify-token'

const store = new UserStore()

//Express handler functions

const index = async (_req: Request, res: Response) => {
    try {
        console.log(`${res.statusCode}: Users Index Route`);
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }

};

const show = async (req: Request, res: Response) => {
    try {
        console.log(`${res.statusCode}: Users Show Route`);
        const user = await store.show(Number(req.params.id));
        res.json(user)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            user_firstname: req.body.user_firstname,
            user_lastname: req.body.user_lastname,
            user_password: req.body.user_password
        };
        console.log(`${res.statusCode}: Users Create Route`)
        const newUser = await store.create(user)
        // generate JWT with newUser and pass back to client
        var token = jwt.sign({ user: newUser }, String(process.env.TOKEN_SECRET));
        res.json(token)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
}

//Call express methods connected to routes and route handler functions

const user_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
  }
  
  export default user_routes