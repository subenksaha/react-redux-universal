require('rootpath')();
const supertest = require('supertest');
const config = require('config');
var console = require('libs/logger');
var models = require('models');
var api = supertest.agent(`${config.app.host}:${config.app.port}/api`);

describe('CRUD products', function() {
    before(function(done) { // runs before all tests in this block
        this.timeout(10000);
        models
            .sequelize
            .sync({ force: true })
            .then(function() {
                done();
            })
            .catch(function(err) {
                doen(err);
            })
    });
    it('POST /api/products: should failed to create a product', function(done) {
        api
            .post('/products')
            .send({
                name: 'Server License 1',
                description: 'Your demo product'
            })
            .expect(400, done);
    });
    it('POST /api/products: should succeed to create a product', function(done) {
        api
            .post('/products')
            .send({
                name: 'Server License 1',
                description: 'Your demo product',
                status: 'ACTIVE',
                cost: '150.55'
            })
            .expect(200)
            .end(done);
    });
    it(`GET /api/products/:productId: should succeed to view the product`, function(done) {
        api
            .get(`/products/1`)
            .expect(200, done);
    });
    it(`PUT /api/products/:productId: should succeed to edit the product`, function(done) {
        api
            .put(`/products/1`)
            .send({
                id: 1,
                cost: '250.55'
            })
            .expect(200, done);
    });
    it(`DELETE /api/products/:productId: should succeed to delete the product`, function(done) {
        api
            .delete(`/products/1`)
            .send({
                id: 1
            })
            .expect(200, done);
    });
    after(function(done) { // runs before all tests in this block
        this.timeout(10000);
        models
            .sequelize
            .sync({ force: true })
            .then(function() {
                done();
            })
            .catch(function(err) {
                doen(err);
            })
    });
});