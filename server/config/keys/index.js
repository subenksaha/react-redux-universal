var NODE_ENV = process.env.NODE_ENV;
switch (NODE_ENV) {
    case 'production':
        module.exports = require('./prod');
        break;
    default:
        module.exports = require('./dev');
}