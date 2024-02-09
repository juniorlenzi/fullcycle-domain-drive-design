import { v4 as uuid } from 'uuid'
import UpdateProductUseCase from './update.product.usecase'

const input = {
    id: uuid(),
    name: 'Product Updated',
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(input)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find product use caso', () => {
    it('should update a product', async () => {
        const repository = MockRepository()
        const productUpdateUseCase = new UpdateProductUseCase(repository)
        const output = await productUpdateUseCase.execute(input)

        expect(output).toEqual({ 
            id: input.id, 
            name: input.name,
            price: input.price
        })
    })
})