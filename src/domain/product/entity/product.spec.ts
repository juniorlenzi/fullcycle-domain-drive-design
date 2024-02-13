import Product from "./product"

describe("Product unit test", () => {
    it("should throw an error if the id is empty", () => {

        expect(() => {
            const product = new Product('', 'Product name', 100)
        })
        .toThrow("Product: Id is required")
    })

    it("should throw an error if the name is empty", () => {

        expect(() => {
            const product = new Product('1', '', 100)
        })
        .toThrow("Product: Name is required")
    })

    it("should throw an error when price is less than or equal to 0", () => {
        expect(() => {
            const product = new Product('1', 'Product name', -1)
        })
        .toThrow("Product: Price must be greater than 0")
    })

    it("should change name", () => {
        const product = new Product('1', 'Product name', 100)

        product.changeName('New name')
        expect(product.name).toBe('New name')
    })

    it("should change price", () => {
        const product = new Product('1', 'Product name', 100)

        product.changePrice(200)
        expect(product.price).toBe(200)
    })

})