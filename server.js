/**
 * Created by Louis on 29/07/2017.
 */
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var welcome = function (req, res) {
    var page = url.parse(req.url).pathname;

    if (page == '/') {
        var params = querystring.parse(url.parse(req.url).query);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('<!DOCTYPE html>' +
            '<html>' +
            '    <head>' +
            '        <meta charset="utf-8" />' +
            '        <title>Ma page Node.js !</title>' +
            '    </head>' +
            '    <body>' +
            '       <p>Bonjour ' + params['nom'] + ' ' + params['prenom'] + '</p>' +
            '       <p>Voici un paragraphe <strong>HTML</strong> !</p>' +
            '    </body>' +
            '</html>');
        res.end();
    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('<!DOCTYPE html>' +
            '<html>' +
            '    <head>' +
            '        <meta charset="utf-8" />' +
            '        <title>Not found</title>' +
            '    </head>' +
            '    <body>' +
            '       <p>La page que vous demandez <strong>n\'existe pas</strong> !</p>' +
            '    </body>' +
            '</html>');
        res.end();
    }
}

var server = http.createServer()

server.on('request', welcome)

server.listen(8080)

server.on('start', function() {
    console.log('Start server')
})

server.on('close', function() {
   console.log('Stop server');
});

server.close();