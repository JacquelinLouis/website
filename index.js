/**
 * Created by Louis on 29/07/2017.
 */
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.status(200);
    res.render('pages/working');
});

app.get('/about', function (req, res) {
    res.status(200);
    res.render('pages/about');
});

app.get('/blog', function (req, res) {
    res.status(200);
    res.render('pages/working');
});

app.get('/contact', function (req, res) {
    res.status(200);
    res.render('pages/working');
});

app.get('/projects', function (req, res) {
    res.status(200);
    res.render('pages/working');
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('pages/notFound');
});

app.listen(8080);