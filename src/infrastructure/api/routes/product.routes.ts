import express, { Request, Response } from "express";
import ProductRepository from "../../database/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoutes = express.Router()

productRoutes.post('/', async (req: Request, res: Response) => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    try {
        const productInputDto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price
        }
        const output = await useCase.execute(productInputDto)
        res.status(201).send(output)
    } catch (e) {
        res.status(500).send(e)
    }
})

productRoutes.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository())
    try {
        const output = await useCase.execute()
        res.status(200).send(output)
    }catch (e) {
        res.status(500).send(e)
    }
})
