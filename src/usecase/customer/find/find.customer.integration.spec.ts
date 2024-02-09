import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/database/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/database/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use caso', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer('123', 'John Doe')
        const address = new Address('street', 123, '1234567', 'city')
        customer.Address = address

        await customerRepository.create(customer)

        const input = { id: '123' }
        const output = { id: '123', name: 'John Doe', address: { street: 'street', city: 'city', number: 123, zip: '1234567' } }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })

})