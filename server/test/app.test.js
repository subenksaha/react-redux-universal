const supertest = require('supertest');
const config = require('../../config');
var server = supertest.agent(`${config.app.host}:${config.app.port}`);

describe('GET /', function() {
    it('should render ok', function(done) {
        server
            .get('/')
            .expect(200, done);
    });
});