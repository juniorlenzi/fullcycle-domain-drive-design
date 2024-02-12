import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Product 1',
                price: 100
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Product 1');
        expect(response.body).toHaveProperty('price', 100);
    })

    it('should not create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({ 
                name: 'Product 1'
            });                

        expect(response.status).toBe(500);
    })
    
    it('should list all products', async () => {
        await request(app)
            .post('/product')
            .send({
                name: 'Product 1',
                price: 100
            });

        await request(app)
            .post('/product')
            .send({
                name: 'Product 2',
                price: 200
            });

        const response = await request(app).get('/product');
        
        expect(response.status).toBe(200);
        expect(response.body.products).toHaveLength(2);
    })
})