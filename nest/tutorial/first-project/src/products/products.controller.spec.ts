import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductTest } from "./products.controller.spec.helper";

// Unit testing stuff using Jest for practice

// Can group tests together using a describe block
// before and after blocks only apply to tests within this describe block
// Good practice
describe('ProductsController', () => {
    let productsController: ProductsController;
    let productsService: ProductsService;
    let productTest: ProductTest;
    
    // applied to each test before it is run in this scope (describe)
    beforeEach(() => {
        productTest = new ProductTest();
        productsService = new ProductsService();
        productsController = new ProductsController(productsService);
    });

    // How do you test that a product has been added to the array without actually adding to the array??
    describe('addProduct', () => {
        // it and test are equivalent
        it('should insert a new product', async () => {
            const testProduct = productTest.createTestProduct(1);
            
            // creates a mock implementation of the function
            //jest.spyOn(productsService, 'insertProduct').mockImplementation(() => testProduct.id);

            expect(await productsController.addProduct(
                testProduct.title,
                testProduct.desc,
                testProduct.price
            )).toMatchObject( { id: testProduct.id } );
        });
    });

    describe('getAllProducts', () => {
        it('should return an array of products', async () => {
            const testProducts = [];
            testProducts.push(productTest.createTestProduct(1));
            testProducts.push(productTest.createTestProduct(2));
            testProducts.push(productTest.createTestProduct(3));

            testProducts.forEach((product) => {
                productsController.addProduct(
                    product.title,
                    product.desc,
                    product.price
                )
            });

            expect(await productsController.getAllProducts()).toMatchObject([
                {
                    id: "1",
                    title: "Product",
                    desc: "This is a product.",
                    price: 29.99
                },
                {
                    id: "2",
                    title: "Product",
                    desc: "This is a product.",
                    price: 29.99
                },
                {
                    id: "3",
                    title: "Product",
                    desc: "This is a product.",
                    price: 29.99
                }
            ]);
        });
    });

    // et cetera...
    /* Questions
     * How do you test data that is created? For example, in insertProduct would
     *   a better implementation be to insert and then get that product?
     * When is it good practice to mock a function?
     */
});