import Product from "../entity/product"
import ProductService from "./product.service"

describe('Order Service unit tests', () => {
    it('should change the price of all products', () => {
        const product_1 = new Product('1', 'Product 1', 10)
        const product_2 = new Product('2', 'Product 2', 20)

        const products = [product_1, product_2]

        ProductService.increasePriceInPercent(products, 100)

        expect(product_1.price).toBe(20)
        expect(product_2.price).toBe(40)
    })
})