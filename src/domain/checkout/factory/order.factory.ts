import Order from '../entity/order';
import OrderItem from '../entity/order_item';

interface OrderItemProps {
    id: string, name: string, productId: string, price: number, quantity: number
}

interface OrderProps {
    id: string, customerId: string, items: OrderItemProps[]
}

export default class OrderFactory {

    static create(props: OrderProps): Order {
        
        const orderItens = props.items.map(item => new OrderItem(item.id, item.name,  item.price, item.productId, item.quantity))
        const order = new Order(props.id, props.customerId, orderItens)

        return order
    }
}