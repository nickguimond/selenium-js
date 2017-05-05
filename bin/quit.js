const http = require('http');

http.get({
        hostname: '127.0.0.1',
        port: 4444,
        path: '/selenium-server/driver?cmd=shutDownSeleniumServer'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            //var parsed = JSON.parse(body);
            console.log(body);
        });
    });
