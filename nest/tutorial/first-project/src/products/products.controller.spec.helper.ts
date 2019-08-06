import { Product } from "./products.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductTest {
    createTestProduct(id: number): Product {
        const prodId = id.toString();
        const title = "Product";
        const desc = "This is a product.";
        const price = 29.99;
        const testProduct = new Product(prodId, title, desc, price);

        return testProduct;
    }
}