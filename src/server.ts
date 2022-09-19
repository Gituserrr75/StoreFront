import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handlers.ts/products'
import orderProductRoutes from './handlers.ts/ordersOfProducts'
import OrderRoutes from './handlers.ts/orders'
import userRoutes from './handlers.ts/users'


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello to Storefront App')
})

productRoutes(app);
orderProductRoutes(app);
OrderRoutes(app);
userRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
