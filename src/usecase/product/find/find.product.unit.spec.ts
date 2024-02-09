import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const prod = new Product('123', 'Product A', 123)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(prod)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find product use caso', () => {
    it('should find a product', async () => {
        const prodRepository = MockRepository()
        const usecase = new FindProductUseCase(prodRepository)

        const input = { id: '123' }
        const output = { id: '123', name: 'Product A', price: 123 }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })

    it('should not find a product', async () => {
        const prodRepository = MockRepository()
        
        prodRepository.find.mockImplementation(() => {
            throw new Error('Product not found')
        })

        const usecase = new FindProductUseCase(prodRepository)
        const input = { id: '123' }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow('Product not found')
    })
})