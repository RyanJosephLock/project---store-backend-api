import request from 'supertest'
import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import product_routes from '../products'

const app = express();
app.use(bodyParser.json())
product_routes(app);

describe("----- Products Handlers -----", () => {

    it('should create a product when POST /products is called', async () => {
        const testToken = jwt.sign({ "user_firstname": "Test", "user_lastname": "User", "user_password": "TestPassword" }, String(process.env.TOKEN_SECRET));
        const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${testToken}`)
        .send({product_name: 'TestProduct', product_category: 'TestCategory', product_price: 10})
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should return an index of products when GET /products is called', async () => { 
        const response = await request(app)
        .get('/products')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should show a single product when GET /products/1 is called', async () => { 
        const response = await request(app)
        .get('/products/1')
        .expect(200)
        .expect('Content-Type', /json/);
    });

});
