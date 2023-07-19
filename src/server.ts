import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import product_routes from './handlers/products'
import user_routes from './handlers/users'
import order_routes from './handlers/orders'
import dashboard_routes from './handlers/dashboard'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

// Allow external domains to access API
app.use(cors(corsOptions))

// Use JSON for API strings
app.use(bodyParser.json())

product_routes(app);
user_routes(app);
order_routes(app);
dashboard_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
