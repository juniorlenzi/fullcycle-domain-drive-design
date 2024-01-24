import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from 'uuid';

export default class OrderService {

    static getTotal(orders: Order[]): number {

        return orders.reduce((total, order) => {
            return total + order.total()
        }, 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (!customer) {
            throw new Error('Customer is required')
        }

        if(!customer.isActive() ){
            throw new Error('Customer is not active')
        }

        if (!items || items.length === 0) {
            throw new Error('Order must contain at least one item')
        }

        const orderId = uuid()
        const order = new Order(orderId, customer.id, items)
        customer.addRewardPoints(order.total() / 2)

        return order
    }

}