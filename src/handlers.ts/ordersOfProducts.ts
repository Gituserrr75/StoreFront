import express, { Request, Response,NextFunction} from "express";
import Authenticate from './Auth'
import orderProductsModel, { orderProducts } from "../models/orders-of-products";


const OPhandler = new orderProductsModel(); 
 

const index = async (req: Request, res: Response) => {
    try {
       const orderproduct = await OPhandler.index();
       res.json(orderproduct);
    } catch (error) {
       res.status(400).send(error)
    }
   };
   
   const create =async (req: Request, res: Response) => {
       try {
           const OPData: orderProducts = {
               order_id: req.body.order_id as number ,
               product_id: req.body.product_id as number,
               quantity: req.body.quantity as number
           }
           const newOP= await OPhandler.create(OPData)
           res.json(newOP)
       } catch(err) {
           res.status(400)
       }
   };
   
   const show =async (req: Request, res: Response) => {
       try {
           const orderproductid = req.params.id as unknown as string
           const showOP = await OPhandler.show(orderproductid)
           res.json(showOP);
       } catch (error) {
           res.status(400)
       }
   }; 
   
   const deleted =async (req: Request, res: Response) => {
       try {
           const orderproductid = req.params.id as unknown as string
           await OPhandler.delete(orderproductid)
           res.json(`Order is successfully deleted`);
       } catch (error) {
           res.status(400)
       }
   }; 
   
   const update = async (req: Request, res: Response) => {
       try {
        const OPData: orderProducts = {
            order_id: req.body.order_id as number ,
            product_id: req.body.product_id as number,
            quantity: req.body.quantity as number
        }
           const id = req.params.id as unknown as number
           const updateOP= await OPhandler.update(OPData, id)
           res.json(updateOP)
       } catch(err) {
           res.status(400)
       }
   };

   const orderProductRoutes = (app: express.Application) => {
    app.get("/orderProducts", index);
    app.get("/orderproducts/:id", show);
    app.post("/orderproducts", Authenticate, create);
    app.delete("/orderproducts", Authenticate, deleted);
    app.post("/orderproducts", Authenticate, update);
  };

  export default orderProductRoutes 