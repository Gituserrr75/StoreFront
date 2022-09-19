import express, { Request, Response,NextFunction} from "express";
import Authenticate from './Auth'
import ProductStore, { product } from '../models/products'



const p = new ProductStore();

const index = async (req: Request, res: Response) => {
 try {
    const products = await p.index();
    res.json(products);
 } catch (error) {
    res.status(400).send(error)
 }
};

const create =async (req: Request, res: Response) => {
    try {
        const productData: product = {
            name: req.body.name as string ,
            price: req.body.price as number,
            category: req.body.category as string
        }
        const newProduct= await p.create(productData)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
    }
};

const show =async (req: Request, res: Response) => {
    try {
        const productid = req.params.id as unknown as string
        const showProduct = await p.show(productid)
        res.json(showProduct);
    } catch (error) {
        res.status(400)
    }
}; 

const deleteproduct =async (req: Request, res: Response) => {
    try {
        const productid = req.params.id as unknown as string
        await p.delete(productid)
        res.json(`product is successfully deleted`);
    } catch (error) {
        res.status(400)
    }
}; 

const update = async (req: Request, res: Response) => {
    try {
        const productData: product = {
            name: req.body.name as string ,
            price: req.body.price as number,
            category: req.body.category as string
        }
        const id = req.params.id as unknown as number
        const updateProduct= await p.update(productData, id)
        res.json(updateProduct)
    } catch(err) {
        res.status(400)
    }
};



const productRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", Authenticate, create);
    app.delete("/products", Authenticate, deleteproduct);
    app.post("/products", Authenticate, update);
  };

  export default productRoutes 