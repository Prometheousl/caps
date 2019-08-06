import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, UseFilters, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CapitalizePipe } from './products.capitalize.pipe';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { TestException } from '../exceptions/test.exception';
import { Price } from './decorators/price.decorator';

// filter is controller-scoped... can also be method-scoped or globally-scoped
@Controller('products')
@UseFilters(new HttpExceptionFilter())
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    // expecting a 'title' object from the incoming post body... will extract it and put it into prodTitle
    @Post()
    @UsePipes(new ValidationPipe(), new CapitalizePipe())
    addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        this.productsService.updateProduct(
            prodId, 
            prodTitle,
            prodDesc,
            prodPrice
        );
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId);
        return null;
    }

    @Put()
    TestException() {
        throw new TestException();
    }
}
