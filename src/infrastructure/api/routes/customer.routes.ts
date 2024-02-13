import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../database/customer/repository/sequelize/customer.repository";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoutes = express.Router()

customerRoutes.post('/', async (req: Request, res: Response) => {
    const customerRepository = new CustomerRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    try {
        const customerDto: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city,
            }
        }
        const output = await useCase.execute(customerDto)
        res.status(201).send(output)
    } catch (e) {
        res.status(500).send(e)
    }
})

customerRoutes.get('/', async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository())
    const output = await useCase.execute()

    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(CustomerPresenter.toListXML(output))
    })
})
