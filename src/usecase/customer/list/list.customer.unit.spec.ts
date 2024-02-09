import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer_1 = CustomerFactory.createWithAddress('John Doe', new Address('street', 123, '1234567', 'city'));
const customer_2 = CustomerFactory.createWithAddress('Jane Doe', new Address('street', 123, '1234567', 'city'));
const customer_3 = CustomerFactory.createWithAddress('Jack Doe', new Address('street', 123, '1234567', 'city'));

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer_1, customer_2, customer_3])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test list customer use case', () => {
    it('should list all customers', async () => {
        const customerRepository = MockRepository()
        const customerListUseCase = new ListCustomerUseCase(customerRepository)
        const output = await customerListUseCase.execute()

        expect(output.customers.length).toBe(3)
        expect(output.customers[0]).toEqual({ id: customer_1.id, name: customer_1.name, address: { street: customer_1.Address.street, number: customer_1.Address.number, zip: customer_1.Address.zip, city: customer_1.Address.city } })
        expect(output.customers[1]).toEqual({ id: customer_2.id, name: customer_2.name, address: { street: customer_2.Address.street, number: customer_2.Address.number, zip: customer_2.Address.zip, city: customer_2.Address.city } })
        expect(output.customers[2]).toEqual({ id: customer_3.id, name: customer_3.name, address: { street: customer_3.Address.street, number: customer_3.Address.number, zip: customer_3.Address.zip, city: customer_3.Address.city } })
    })
})