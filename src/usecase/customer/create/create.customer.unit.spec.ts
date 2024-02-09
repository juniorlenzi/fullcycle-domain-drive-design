import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: 'John Doe',
    address: {
        street: 'street',
        number: 123,
        zip: '1234567',
        city: 'city'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test create customer use case', () => {
    it('should create a customer', async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
        const output = await customerCreateUseCase.execute(input)
        
        expect(output).toEqual({ 
            id: expect.any(String), 
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    })

    it('should throw an error when name is missing', async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        input.name = ''

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Name is required')
    })
})