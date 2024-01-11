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
})