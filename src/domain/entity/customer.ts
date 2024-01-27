import EventDispatcher from "../event/@shared/event.dispatcher";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import SendConsoleLog1Handler from "../event/customer/handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "../event/customer/handler/send-console-log-2.handler";
import SendConsoleLogHandler from "../event/customer/handler/send-console-log-handler";
import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true
    private _rewardPoints: number = 0;


    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    create(){
        //lógica de criação do cliente
        
        const eventDispatcher = new EventDispatcher()
        const firstEventHandler = new SendConsoleLog1Handler()
        const secondEventHandler = new SendConsoleLog2Handler()

        eventDispatcher.register('CustomerCreatedEvent', [firstEventHandler, secondEventHandler])
        eventDispatcher.notify(new CustomerCreatedEvent(this))
    }

    validate() {
        if (this._id.length == 0) {
            throw new Error('Id is required')
        }

        if (this._name.length == 0) {
            throw new Error('Name is required')
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
            throw new Error("Address is mandatory to activate a customer");
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

    get id(): string {
        return this._id;
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