import { Injectable, NestMiddleware } from "@nestjs/common";

// class middleware - implements NestMiddleware interface

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        log(req,res);
        next();
    }
}

// -------------------------------------------------------------------
// functional middleware

export function logger(req: Request, res: Response, next: Function) {
    log(req,res);
    next();
}

function log(req: Request, res: Response) {
    console.log('Products request received.');
    console.log('Method: ' + req.method);
}