import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Customer 1")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Customer 1")
        expect(customer.Address).toBeUndefined()
    })

    it('should create a customer with address', () => {
        const address = new Address('street', 123, '123456', 'city')
        const customer = CustomerFactory.createWithAddress("Customer 1", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Customer 1")
        expect(customer.Address).toBeDefined()
    })
})