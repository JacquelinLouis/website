/**
 * Created by Louis on 29/07/2017.
 */

// express
var express = require('express');
var app = express();
// internationalization
var i18n = require('i18n');
i18n.configure({
    locales:['en', 'fr'],
    directory: __dirname + '/locales'
});
// cookies
var cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(i18n.init);
app.use(cookieParser());


// database
var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'http://localhost:27017';
// initialize database
/*
mongoClient.connect(dbUrl, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.createCollection("articles", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

function insertInDB(myObj) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;
        db.collection('articles').insertOne(myObj, function(err, res) {
            if (err) throw err;
            console.log("1 article inserted");
            db.close();
        });
    });
}

function readInDB() {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;
        db.collection('articles').find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}
 */

app.get('/', function (req, res) {
    res.status(200);
    var localeValue = '';
    // get cookie from client
    if (typeof req.cookies !== 'undefined' && typeof req.cookies.language !== 'undefined'
        && (localeValue = req.cookies.language) !== res.getLocale() && i18n.getLocales().indexOf(localeValue) > -1) {
        // language has change
        i18n.setLocale(localeValue);
    } else {
        // invalid cookie value, reset cookie
        res.cookie('language', i18n.getLocale());
    }
    console.log(i18n.getLocales());
    res.render('pages/working.ejs', { i18n: i18n });
});

app.get('/about', function (req, res) {
    res.status(200);
    res.render('pages/about.ejs', { i18n: i18n });
});

app.get('/blog', function (req, res) {
    res.status(200);
    res.render('pages/working.ejs', { i18n: i18n });
});

app.get('/contact', function (req, res) {
    res.status(200);
    res.render('pages/working', { i18n: i18n });
});

app.get('/projects', function (req, res) {
    res.status(200);
    res.render('pages/working.ejs', { i18n: i18n });
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('pages/notFound.ejs', { i18n: i18n });
});

app.listen(8080);