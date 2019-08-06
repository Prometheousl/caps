import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ProductsController } from './products.controller';
import { ProductsService } from "./products.service";
import { LoggerMiddleware } from "./products.logger.middleware";

// modules that include middleware have to implement the NestModule interface
@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule implements NestModule {
    // MiddlewareConsumer is a helper class that comes with built-in methods to
    //   manage middleware.
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('products')
    }
}

// I'm not sure if this would better be suited in the root module...
// It might be better practice to put all of the middleware in the root module.