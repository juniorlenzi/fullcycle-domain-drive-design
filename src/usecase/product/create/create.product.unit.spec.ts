import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: 'Product A',
    price: 123
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test create product use case', () => {
    it('should create a product', async () => {
        const productRepository = MockRepository()
        const createUseCase = new CreateProductUseCase(productRepository)
        const output = await createUseCase.execute(input)
        
        expect(output).toEqual({ 
            id: expect.any(String), 
            name: input.name,
            price: input.price
        })
    })
})