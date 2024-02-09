import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

const address = new Address('street', 123, '1234567', 'city')
const customer = CustomerFactory.createWithAddress('John Doe', address)

const input = {
    id: customer.id,
    name: 'John Doe Updated',
    address: {
        street: 'street updated',
        number: 123,
        zip: '1234567',
        city: 'city'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find customer use caso', () => {
    it('should update a customer', async () => {
        const customerRepository = MockRepository()
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual({ 
            id: input.id, 
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    })
})