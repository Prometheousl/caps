import { createParamDecorator } from "@nestjs/common";

export const Price = createParamDecorator((data: string, req) => {
    console.log(data);
    console.log(req.price);
    console.log(req.price[data]);
    return data ? req.price && req.price[data] : req.price;
});