import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe('Order Service unit tests', () => {

    it('should get total of all orders', () => {
        let order_1 = new Order('123', '123', [
            new OrderItem('1', 'Item 1', 10, '1', 2),
            new OrderItem('2', 'Item 2', 20, '1', 1)
        ])

        let order_2 = new Order('123', '123', [
            new OrderItem('1', 'Item 1', 10, '1', 2),
            new OrderItem('2', 'Item 2', 20, '1', 1)
        ])

        const total = OrderService.getTotal([order_1, order_2])

        expect(total).toBe(80)

    })

    it('should place an order', () => {
        const customer = new Customer('123', 'John Doe')

        const orderItem = new OrderItem('1', 'Item 1', 10, '1', 1)

        const order = OrderService.placeOrder(customer, [orderItem])
        const total = order.total()

        expect(customer.rewardPoints).toBe(5)
        expect(total).toBe(10)
    })
})