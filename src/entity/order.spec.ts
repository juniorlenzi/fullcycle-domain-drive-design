import Order from "./order"
import OrderItem from "./order_item"

describe("Order unit test", () => {
    it("should throw an error if the id is empty", () => {

        expect(() => {
            let order = new Order('', '123', [])
        }).toThrow("Id is required")
    })

    it("should throw an error if the customer id is empty", () => {
        expect(() => {
            let order = new Order('123', '', [])
        }).toThrow("Customer id is required")
    })

    it("should throw an error if the items is empty", () => {
        expect(() => {
            let order = new Order('123', '123', [])
        }).toThrow("Items is required")
    })

    it("should calculate the total price", () => {
        let order = new Order('123', '123', [
            new OrderItem('1', 'Item 1', 10, '1', 2),
            new OrderItem('2', 'Item 2', 20, '1', 1)
        ])

        const total = order.total()

        expect(total).toBe(40)
    })
    it("should check if the item quantity is greater than 0", () => {
        expect(() => {
            let order = new Order('123', '123', [
                new OrderItem('1', 'Item 1', 10, '1', 0),
            ])
        }).toThrow("Quantity must be greater than 0")
    })

})