import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase"
import ProductModel from "../../../infrastructure/database/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/database/product/repository/sequelize/product.repository";

const input = {
    name: 'Product A',
    price: 123
}

describe('Unit Test create product use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it('should create a product', async () => {
        const productRepository = new ProductRepository()
        const createUseCase = new CreateProductUseCase(productRepository)
        const output = await createUseCase.execute(input)

        expect(output).toEqual({ 
            id: expect.any(String), 
            name: input.name,
            price: input.price
        })
    })
})