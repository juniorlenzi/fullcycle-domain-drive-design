import Notification from './notification'

describe('Unit tests for notifications', () => {
    it("should create errors", () => { 
        const notification = new Notification()
        const error = {
            message: "Error message Customer",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.messages('customer')).toBe("customer: Error message Customer")

        const error_2 = {
            message: "Error message Customer 2",
            context: "customer"
        }

        notification.addError(error_2)

        const error_3 = {
            message: "Error message not customer",
            context: "other"
        }

        notification.addError(error_3)

        expect(notification.messages('customer')).toBe("customer: Error message Customer, customer: Error message Customer 2")
        expect(notification.messages('other')).toBe("other: Error message not customer")
    })

    it("should check if notification has errors", () => {
        const notification = new Notification()
        const error = {
            message: "Error message Customer",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.hasErrors()).toBe(true)
    })
    it('should get all errors props', () => {
        const notification = new Notification()
        const error = {
            message: "Error message Customer",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.getErrors()).toEqual([error])
    })
})