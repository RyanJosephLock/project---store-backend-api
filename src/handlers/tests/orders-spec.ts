import request from 'supertest'
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import order_routes from '../orders'

const app = express();
app.use(bodyParser.json())
order_routes(app);

describe("----- Orders Handlers -----", () => {

    it('should create an order when POST /users is called', async () => {
        const response = await request(app)
        .post('/orders')
        .send({user_id: 1, order_status: 'open'})
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should return an index of orders when GET /users is called', async () => { 
        const response = await request(app)
        .get('/orders')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should show a single order when GET /orders/1 is called', async () => { 
        const response = await request(app)
        .get('/orders/1')
        .expect(200)
        .expect('Content-Type', /json/);
    });

});
