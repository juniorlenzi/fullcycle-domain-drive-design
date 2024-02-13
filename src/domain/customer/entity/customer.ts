import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcher from "../../@shared/event/event.dispatcher";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerAddressChangedEvent from "../events/customer-address-changed.event";
import CustomerCreatedEvent from "../events/customer-created.event";
import SendConsoleLog1Handler from "../events/handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "../events/handler/send-console-log-2.handler";
import SendConsoleLogHandler from "../events/handler/send-console-log-handler";
import Address from "../value-object/address";

export default class Customer extends Entity{

    private _name: string;
    private _address: Address;
    private _active: boolean = true
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    create(){
        const eventDispatcher = new EventDispatcher()
        const firstEventHandler = new SendConsoleLog1Handler()
        const secondEventHandler = new SendConsoleLog2Handler()

        eventDispatcher.register('CustomerCreatedEvent', [firstEventHandler, secondEventHandler])
        eventDispatcher.notify(new CustomerCreatedEvent(this))
    }

    validate() {
        if (this._id.length == 0) {
            this.notification.addError({ message: 'Id is required', context: 'customer' })
        }

        if (this._name.length == 0) {
            this.notification.addError({ message: 'Name is required', context: 'customer' })
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get Address(): Address {
        return this._address;
    }

    activate() {
        if (this._address === undefined) {
            this.notification.addError({ message: 'customer: Address is mandatory to activate a customer', context: 'customer' })
        }

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;

        const eventDispatcher = new EventDispatcher()
        const sendConsoleLogEventHandler = new SendConsoleLogHandler()
        eventDispatcher.register('CustomerAddressChangedEvent', [sendConsoleLogEventHandler])

        const event = new CustomerAddressChangedEvent({
            id: this._id,
            name: this._name,
            address: this._address.toString()
        })

        eventDispatcher.notify(event)
    }

    get name(): string {
        return this._name;
    }
    
    get rewardPoints(): number {
        return this._rewardPoints
    }

    isActive(): boolean {
        return this._active
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points
    }
}