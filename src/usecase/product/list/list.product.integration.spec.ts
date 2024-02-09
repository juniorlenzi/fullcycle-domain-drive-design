import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"
import ProductModel from "../../../infrastructure/database/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/database/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"

describe('Integration Test list product use case', () => {

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
    it('should list all products', async () => {
        const prodRepository = new ProductRepository()

        const prod_1 = ProductFactory.create('a', 'Product A', 123)
        const prod_2 = ProductFactory.create('b', 'Product B', 456)
        const prod_3 = ProductFactory.create('a', 'Product C', 789)

        await prodRepository.create(prod_1 as Product)
        await prodRepository.create(prod_2 as Product)
        await prodRepository.create(prod_3 as Product)

        const prodListUseCase = new ListProductUseCase(prodRepository)
        const output = await prodListUseCase.execute()

        expect(output.products.length).toBe(3)
        expect(output.products[0]).toEqual({ id: prod_1.id, name: prod_1.name, price: prod_1.price })
        expect(output.products[1]).toEqual({ id: prod_2.id, name: prod_2.name, price: prod_2.price })
        expect(output.products[2]).toEqual({ id: prod_3.id, name: prod_3.name, price: prod_3.price })
    })
})