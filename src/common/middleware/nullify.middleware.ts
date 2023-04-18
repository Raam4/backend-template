import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class NullifyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        for(var prop in req.body){
            if(req.body[prop] === ""){
                req.body[prop] = null;
            }
        }
        next();
    }
}