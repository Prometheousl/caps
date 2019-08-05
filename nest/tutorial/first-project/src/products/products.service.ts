import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProducts() {
        /*  this.products is a pointer to the private variable products
            to avoid modifying this private variable need to pass a copy of the data
            this is one of the ways to accomplish this:
        */
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        // variable destructuring... super cool!!... modern js and typescript
        const [product, productIndex] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title)
            updatedProduct.title = title;
        if(description)
            updatedProduct.desc = description;
        if(price)
            updatedProduct.price = price;
        this.products[productIndex] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const prodIndex = this.findProduct(prodId)[1];
        this.products.splice(prodIndex,1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product with id ' + id);
        }
        return [product, productIndex];
    }
}