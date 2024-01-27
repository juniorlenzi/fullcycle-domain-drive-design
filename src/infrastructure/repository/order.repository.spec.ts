import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository(); 
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "John Doe")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    await customerRepository.create(customer);
    
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', 'product 1', 10, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ 
      where: { id: order.id },
      include: [ "items" ] 
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 10,
      items: [
        { 
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: order.id
        }
      ]
    });
  });

  it("should update the order", async () => {
    
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository(); 
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "John Doe")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    await customerRepository.create(customer);
    
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', 'product 1', 10, product.id, 1);
    const order = new Order('2', customer.id, [orderItem]);
    await orderRepository.create(order);

    const getOrder = await orderRepository.find(order.id);

    expect(getOrder).toStrictEqual(order);
    expect(getOrder.total()).toBe(10);

    const orderItem2 = new OrderItem('2', 'product 2', 10, product.id, 2);
    order.addItem(orderItem2);

    await orderRepository.update(order);

    const getOrder2 = await orderRepository.find(order.id);

    expect(getOrder2).toStrictEqual(order);
    expect(getOrder2.total()).toBe(30);
  });

  it ( "Should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository(); 
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "John Doe")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    await customerRepository.create(customer);
    
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', 'product 1', 10, product.id, 1);
    const order = new Order('2', customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderItem2 = new OrderItem('2', 'product 2', 10, product.id, 2);
    const order2 = new Order('3', customer.id, [orderItem2]);
    await orderRepository.create(order2);

    const ordersFound = await orderRepository.findAll();
    expect(ordersFound).toStrictEqual([order, order2]);
  })
});