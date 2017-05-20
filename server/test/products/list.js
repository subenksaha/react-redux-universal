const supertest = require("supertest");
const config = require('../../../config');
var api = supertest.agent(`${config.app.host}:${config.app.port}/api`);

describe('GET /api/products', function() {
  it('should render ok', function(done) {
    api
      .get('/products')
      .expect(200, done);
  });
});
