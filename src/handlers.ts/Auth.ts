import { Request, Response,NextFunction} from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { tokenSecret } = process.env;

export default function Authenticate(
    Request:Request,
    Response:Response,
    Next: NextFunction
): void{
try {
    const authorizationHeader = Request.headers.authorization as unknown as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, tokenSecret as Secret)
    Next();
} catch (error) {
    Response.status(400).send("Unauthorized");
    return;
}
};