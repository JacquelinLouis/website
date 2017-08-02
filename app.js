/**
 * Created by Louis on 29/07/2017.
 */

// express
var express = require('express');
var app = express();
// internationalization
/*
var config = {
    "lang": "en",
    "langFile": "./internationalization/locale.json"
};
*/
var i18n = require('i18n');
i18n.configure({
   locales:['en', 'fr'],
    directory: __dirname + '/locales'
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(i18n.init);

app.get('/', function (req, res) {
    res.status(200);
    res.render('pages/working.ejs');
});

app.get('/about', function (req, res) {
    res.status(200);
    res.render('pages/about.ejs', { i18n: i18n});
});

app.get('/blog', function (req, res) {
    res.status(200);
    res.render('pages/working.ejs');
});

app.get('/contact', function (req, res) {
    res.status(200);
    res.render('pages/working');
});

app.get('/projects', function (req, res) {
    res.status(200);
    res.render('pages/working.ejs');
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('pages/notFound.ejs');
});

app.listen(8080);