import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"

const prod_1 = ProductFactory.create('a', 'Product A', 123)
const prod_2 = ProductFactory.create('b', 'Product B', 456)
const prod_3 = ProductFactory.create('a', 'Product C', 789)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([prod_1, prod_2, prod_3])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test list product use case', () => {
    it('should list all products', async () => {
        const prodRepository = MockRepository()
        const prodListUseCase = new ListProductUseCase(prodRepository)
        const output = await prodListUseCase.execute()

        expect(output.products.length).toBe(3)
        expect(output.products[0]).toEqual({ id: prod_1.id, name: prod_1.name, price: prod_1.price })
        expect(output.products[1]).toEqual({ id: prod_2.id, name: prod_2.name, price: prod_2.price })
        expect(output.products[2]).toEqual({ id: prod_3.id, name: prod_3.name, price: prod_3.price })
    })
})