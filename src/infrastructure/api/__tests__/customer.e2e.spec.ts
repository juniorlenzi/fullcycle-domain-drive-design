import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62701',
                    number: '123'
                }
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body.address).toHaveProperty('street', '123 Main St');
        expect(response.body.address).toHaveProperty('city', 'Springfield');
        expect(response.body.address).toHaveProperty('zip', '62701');
    })

    it('should not create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({ name: 'John Doe' });

        expect(response.status).toBe(500);
    })

    it('should list all customers', async () => {
        await request(app)
            .post('/customer')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62701',
                    number: '123'
                }
            });

        await request(app)
            .post('/customer')
            .send({
                name: 'Jane Doe',
                address: {
                    street: '123 Main St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62701',
                    number: '123'
                }
            });

        const response = await request(app).get('/customer');

        expect(response.status).toBe(200);
        expect(response.body.customers).toHaveLength(2);
    })

    it('should list all customers in xml format', async () => {
        await request(app)
            .post('/customer')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62701',
                    number: '123'
                }
            });

        await request(app)
            .post('/customer')
            .send({
                name: 'Jane Doe',
                address: {
                    street: '123 Main St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62701',
                    number: '123'
                }
            });

        const response = await request(app)
            .get('/customer')
            .set('Accept', 'application/xml');

        expect(response.status).toBe(200);
        expect(response.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(response.text).toContain(`<customers>`);
        expect(response.text).toContain(`<customer>`);
        expect(response.text).toContain(`<id>`);
        expect(response.text).toContain(`<name>`);
        expect(response.text).toContain(`<address>`);
        expect(response.text).toContain(`<street>`);
        expect(response.text).toContain(`<city>`);
        expect(response.text).toContain(`<zip>`);
        expect(response.text).toContain(`</customer>`);
        expect(response.text).toContain(`</customers>`);
    })
})