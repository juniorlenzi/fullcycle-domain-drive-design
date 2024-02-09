import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/database/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/database/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
describe('Test find product use caso', () => {

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

    it('should find a product', async () => {
        const prodRepository = new ProductRepository()
        const usecase = new FindProductUseCase(prodRepository)

        const prod = ProductFactory.create('a', 'Product A', 123)
        await prodRepository.create(prod as Product)

        const input = { id: prod.id }
        const output = { id: prod.id, name: 'Product A', price: 123 }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })

})