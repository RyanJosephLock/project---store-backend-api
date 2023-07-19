import express, { Request, Response } from 'express'
import { Order, OrderProduct, OrderStore } from '../models/orders'

const store = new OrderStore()

//Express handler functions

const index = async (_req: express.Request, res: express.Response) => {
    try {
        console.log(`${res.statusCode}: Orders Index Route`);
        const orders = await store.index(); 
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        console.log(`${res.statusCode}: Orders Show Route`);
        const order = await store.show(Number(req.params.id));
        res.json(order)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const create = async (req: express.Request, res: express.Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            order_status: req.body.order_status
        };
        console.log(`${res.statusCode}: Orders Create Route`)
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const addProduct = async (_req: Request, res:Response) => {
    const orderProduct: OrderProduct = {
        order_id: parseInt(_req.params.id),
        product_id: parseInt(_req.body.productId),
        product_quantity: parseInt(_req.body.productQuantity)
    }; 
    console.log(orderProduct)
    try {
        const addedProduct = await store.addProduct(orderProduct)
        res.json(addedProduct)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

//Call express methods connected to routes and route handler functions

const order_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.post('/orders/:id/products', addProduct)
};
  
export default order_routes