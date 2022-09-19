import express, { Request, Response,NextFunction} from "express";
import Authenticate from './Auth'
import orderModerl, { order } from "../models/orders";



const orderhandler = new orderModerl();

const index = async (req: Request, res: Response) => {
 try {
    const orders = await orderhandler.index();
    res.json(orders);
 } catch (error) {
    res.status(400).send(error)
 }
};

const createorder =async (req: Request, res: Response) => {
    try {
        const ordertData: order = {
            user_id: req.body.user_id as string,
            status: req.body.status as string,
        }
        const newOrder= await orderhandler.create(ordertData)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const orderData: order = {
            user_id: req.body.user_id as string,
            status: req.body.status as string,
        }
        const id = req.params.id as unknown as number
        const updateOrder= await orderhandler.update(orderData, id)
        res.json(updateOrder)
    } catch(err) {
        res.status(400)
    }
};

const OrderRoutes= (app: express.Application) => {
    app.get("/products", index);
    app.post("/orders", Authenticate, createorder);
    app.post("/orders", Authenticate, update);
  };

  export default OrderRoutes