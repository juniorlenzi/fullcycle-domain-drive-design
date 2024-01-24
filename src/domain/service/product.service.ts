import Product from "../entity/product";

export default class ProductService {

    static increasePriceInPercent(products: Product[], percent: number): Product[] {
        products.forEach(product => {
            
            const newPrice = ((product.price * percent) / 100) + product.price

            product.changePrice(newPrice)
        })

        return products
    }
}