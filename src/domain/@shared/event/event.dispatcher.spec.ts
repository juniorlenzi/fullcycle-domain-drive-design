import Address from "../../customer/value-object/address"
import Customer from "../../customer/entity/customer"
import CustomerAddressChangedEvent from "../../customer/events/customer-address-changed.event"
import CustomerCreatedEvent from "../../customer/events/customer-created.event"
import SendConsoleLog1Handler from "../../customer/events/handler/send-console-log-1.handler"
import SendConsoleLog2Handler from "../../customer/events/handler/send-console-log-2.handler"
import SendConsoleLogHandler from "../../customer/events/handler/send-console-log-handler"
import SendEmailWhenProductIsCreatedHandler from "../../product/events/handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "../../product/events/product-created.event"
import EventDispatcher from "./event.dispatcher"

describe('Domain events tests', () => {
    it('should register a event handler', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', [eventHandler])

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    })

    it('should unregister a event handler', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', [eventHandler])
        
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

        
        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)


    })

    it('should unregister all events', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', [eventHandler])
        
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
    })

    it('should notify a event', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')
        
        eventDispatcher.register('ProductCreatedEvent', [eventHandler])
        
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({name: 'Product 1', price: 100})
        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent)
    })

    it('should notify a event with multiple handlers', () => {


        const eventDispatcherNotifySpy = jest.spyOn(EventDispatcher.prototype, 'notify');

        const customer = new Customer("1", "John Doe");
        const address = new Address('Rua celso', 453, '83306100', 'Piraquara')
        customer.create()
        customer.Address = address


        expect(eventDispatcherNotifySpy).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent))
        expect(eventDispatcherNotifySpy).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent))
        expect(eventDispatcherNotifySpy).toHaveBeenCalledWith(expect.any(CustomerAddressChangedEvent))
    })

})