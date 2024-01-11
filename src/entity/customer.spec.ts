import Address from "./address";
import Customer from "./customer";

describe("Customer unit test", () => {
    it("should throw an error if the id is empty", () => {

        expect(() => {
            let customer = new Customer('', 'John Doe')
        })
            .toThrow("Id is required")
    })
    it("should throw an error if the name is empty", () => {

        expect(() => {
            let customer = new Customer('1', '')
        })
            .toThrow("Name is required")
    })

    it("should be able to create a customer", () => {
        const customer = new Customer("1", "John Doe");
        expect(customer.id).toBe("1");
        expect(customer.name).toBe("John Doe");
    })

    it("should be able to change the name", () => {
        const customer = new Customer("1", "John Doe");
        customer.changeName("Jane Doe");

        expect(customer.name).toBe("Jane Doe");
    })

    it('should activate customer', () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address('Rua celso', 453, '83306100', 'Piraquara')
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBeTruthy();
    })

    it('should throw error when address is not set when activate customer', () => {
        expect(() => {
            const customer = new Customer("1", "John Doe");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");

    })

    it('should deactivate customer', () => {
        const customer = new Customer("1", "John Doe");
        customer.deactivate();

        expect(customer.isActive()).toBeFalsy();
    })


})