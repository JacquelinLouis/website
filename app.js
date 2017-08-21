/**
 * Created by Louis on 29/07/2017.
 */

// express
var express = require('express');
var app = express();

// body parsing
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

// internationalization
var i18n = require('i18n');
const locales = ['en', 'fr'];
i18n.configure({
    locale: 'en',
    locales: locales,
    directory: __dirname + '/locales'
});

// cookies
var cookieParser = require('cookie-parser');

// database
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

// initialize database
const dbUrl = 'mongodb://localhost:27017/blog';
const dbName = 'articles';

// app use
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(i18n.init);
app.use(cookieParser());

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
*/

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

function languageHandler(req, res) {
    var clientValue = '';
    var serverValue = i18n.getLocale();
    var serverValues = i18n.getLocales();
    // get cookie from client
    if (typeof req.cookies != 'undefined' && typeof req.cookies.language != 'undefined'
        && (clientValue = req.cookies.language) !== serverValue /*&& locales.length > 0 && locales.indexOf(localeValue) > -1*/) {
        // TODO: set local check to avoid setting a not defined language value
        // language has change
        i18n.setLocale(clientValue);
    } else {
        // invalid cookie value, reset cookie
        res.cookie('language', i18n.getLocale());
    }
}

app.get('/', function (req, res) {
    res.status(200);
    languageHandler(req, res);
    res.render('pages/working.ejs', { i18n: i18n });
});

app.get('/about', function (req, res) {
    res.status(200);
    languageHandler(req, res);
    res.render('pages/about.ejs', { i18n: i18n });
});

app.get('/blog', function (req, res) {
    res.status(200);
    languageHandler(req, res);
    var listArticles = [];
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;
        db.collection('articles').find({}).toArray(function(err, result) {
            if (err) throw err;
            result;
            res.render('pages/blog.ejs', { i18n: i18n, listArticles: result });
            // console.log(result);
            db.close();
        });
    });
    // readInDB();
});

app.post('/blog', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.body.method) {
        const method = req.body.method;
        const id = req.body.id;
        const title = req.body.title;
        const content = req.body.content;
        if (method === "put") {
            mongoClient.connect(dbUrl, function (err, db) {
                if (err) throw err;
                db.collection('articles').updateOne({
                    "_id": new mongodb.ObjectID(id),
                    "title": title,
                    "content": content,
                    // "language": language,
                    // "files": files
                }, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        } else if (method === "delete") {
            mongoClient.connect(dbUrl, function (err, db) {
                if (err) throw err;
                db.collection('articles').removeOne({
                    "_id": new mongodb.ObjectID(id),
                    // "language": language,
                    // "files": files
                }, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        }
    } else {
        const title = req.body.title;
        const content = req.body.content;
        const files = req.body.files;
        const language = req.body.language;
        var listArticles = [];
        if (title && content) {
            mongoClient.connect(dbUrl, function (err, db) {
                if (err) throw err;
                db.collection('articles').insertOne({
                    "title": title,
                    "content": content,
                    "language": language,
                    "files": files
                }, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        }
    }
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        db.collection('articles').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.status(200);
            res.render('pages/blog.ejs', {i18n: i18n, listArticles: result});
            // console.log(result);
            db.close();
        });
    });
});

app.get('/contact', function (req, res) {
    res.status(200);
    languageHandler(req, res);
    res.render('pages/working', { i18n: i18n });
});

app.get('/projects', function (req, res) {
    res.status(200);
    languageHandler(req, res);
    res.render('pages/working.ejs', { i18n: i18n });
});

app.get('/login_or_signup', function (req, res) {
    res.status(200);
    languageHandler(req, res);
    res.render('pages/working.ejs', { i18n: i18n });
});

app.use(function(req, res, next) {
    res.status(404);
    languageHandler(req, res);
    res.render('pages/notFound.ejs', { i18n: i18n });
});

app.listen(8080);