var path = require('path');
var fs = require('fs');
var env = process.env.NODE_ENV;
var level = (env == 'prod' ? 'warn' : 'log');
level = (process.env.LOG_LEVEL ? process.env.LOG_LEVEL : level);
var logRoot = path.resolve(__dirname, '../logs/console');
module.exports = require('tracer').colorConsole({
    level: level,
    transport: [
        function(data) {
            var stream = fs.createWriteStream(path.join(logRoot, env + '.log'), {
                flags: 'a',
                encoding: 'utf8',
                mode: '0666'
            }).write(data.output + '\n');
        },
        function(data) {
            console.log(data.output);
        }
    ]
});