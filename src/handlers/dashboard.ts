import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()

const top5PopularProducts = async (_req: Request, res: Response) => {
    try {
        console.log(`${res.statusCode}: Top 5 Popular Products`)
        const products = await dashboard.top5PopularProducts()
        res.json(products)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const productsByCategory = async (_req: Request, res: Response) => {
    try {
        console.log(`${res.statusCode}: Top 5 Popular Products`)
        const category = _req.body.category
        const products = await dashboard.productsByCategory(category)
        res.json(products)    
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const ordersByUserId = async (_req: Request, res: Response) => {
    try {
        console.log(`${res.statusCode}: Orders By UserId`)
        const userId = _req.body.userId
        const orders = await dashboard.ordersByUserId(userId)
        res.json(orders)
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const dashboardRoutes = (app: express.Application) => {
    app.get('/top5popularproducts', top5PopularProducts)
    app.get('/productsbycategory', productsByCategory)
    app.get('/ordersByUserId', ordersByUserId)
};

export default dashboardRoutes