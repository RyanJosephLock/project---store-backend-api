import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import { verifyAuthToken } from '../middlewares/verify-token'

const store = new ProductStore()

//Express handler functions

const index = async (_req: express.Request, res: express.Response) => {
    try {
        console.log(`${res.statusCode}: Products Index Route`);
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        console.log(`${res.statusCode}: Products Show Route`);
        const product = await store.show(Number(req.params.id));
        res.json(product)    
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const create = async (req: express.Request, res: express.Response) => {
    try {
        const product: Product = {
            product_name: req.body.productName,
            product_category: req.body.productCategory,
            product_price: req.body.productPrice
        };
        console.log(`${res.statusCode}: Products Create Route`)
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

//Call express methods connected to routes and route handler functions

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
};
  
export default product_routes