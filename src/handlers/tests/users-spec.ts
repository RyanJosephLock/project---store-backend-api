import request from 'supertest'
import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import user_routes from '../users'

const app = express();
app.use(bodyParser.json())
user_routes(app);

describe("----- Users Handlers -----", () => {

    it('should create a user when POST /users is called', async () => {
        const response = await request(app)
        .post('/users')
        .send({user_firstname: 'UserPost', user_lastname: 'Test', user_password: 'Access'})
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should return an index of users when GET /users is called', async () => { 
        const testToken = jwt.sign({ "user_firstname": "Test", "user_lastname": "User", "user_password": "TestPassword" }, String(process.env.TOKEN_SECRET));
        const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should show a single user when GET /users/1 is called', async () => { 
        const testToken = jwt.sign({ "user_firstname": "Test", "user_lastname": "User", "user_password": "TestPassword" }, String(process.env.TOKEN_SECRET));
        const response = await request(app)
        .get('/users/1')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .expect('Content-Type', /json/);
    });

});
