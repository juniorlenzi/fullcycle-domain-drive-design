import { v4 as uuid } from 'uuid'
import UpdateProductUseCase from './update.product.usecase'
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import ProductFactory from '../../../domain/product/factory/product.factory';
import Product from '../../../domain/product/entity/product';

describe('Unit Test find product use caso', () => {
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
    
    it('should update a product', async () => {
        const repository = new ProductRepository()

        const prod_1 = ProductFactory.create('a', 'Product A', 123) as Product

        await repository.create(prod_1 as Product)

        expect(prod_1.name).toBe('Product A')

        prod_1.changeName('Product Updated')

        const productUpdateUseCase = new UpdateProductUseCase(repository)
        const output = await productUpdateUseCase.execute(prod_1)

        expect(output).toEqual({ 
            id: prod_1.id,
            name: prod_1.name,
            price: prod_1.price
        })
    })
})