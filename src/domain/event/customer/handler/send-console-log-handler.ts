import EventHandlerInterface from "../../@shared/event.handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";


export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {

    handle(event: EventInterface): void {
        const eventName = event.constructor.name;
        const {id, name, address} = event.eventData;

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
    
}