import EventDispatcherInterface from "./event.dispatcher.interface";
import EventHandlerInterface from "./event.handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInterface<EventInterface>[] } = {};

    register(event: string, handlers: EventHandlerInterface<EventInterface>[]): void {
        handlers.forEach((handler) => {
            if(!this.eventHandlers[event]) {
                this.eventHandlers[event] = [];
            }
    
            this.eventHandlers[event].push(handler);
        })
    }

    unregister(event: string, handler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandlers[event]) {
            return;
        }

        this.eventHandlers[event] = this.eventHandlers[event].filter((eventHandler) => eventHandler !== handler)
    }
 
    unregisterAll(): void {
        this.eventHandlers = {};
    }

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface<EventInterface>[] } {
        return this.eventHandlers;
    }


    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if(!this.eventHandlers[eventName]) {
            return;
        }

        this.eventHandlers[eventName].forEach((eventHandler) => {
            eventHandler.handle(event);
        })
    }
}