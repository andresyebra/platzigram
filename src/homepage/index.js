var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
// var title = require('title');

// Route home page
page('/', header, asyncLoad, function (ctx, next) {
    // title('Platzigram');
    $('title').html('Platzigram - Signin');
    var main = document.getElementById('main-container');

    empty(main).appendChild(template(ctx.pictures));
});

function loadPictures(ctx, next) {
    request
        .get('/api/pictures')
        .end(function (err, res) {
            if (err) return console.log(err);

            ctx.pictures = res.body;
            next();
        });
}

function loadPicturesAxios(ctx, next) {
    axios
        .get('/api/pictures')
        .then(function (res) {
            ctx.pictures = res.data;
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function loadPicturesFetch(ctx, next) {
    fetch('/api/pictures')
        .then(function (res) {

            return res.json();

        })
        .then(function (pictures) {
            ctx.pictures = pictures;
            next();
        })

        .catch(function (err) {
            console.log(err);
        });
}

async function asyncLoad(ctx, next) {

    try{
        var pictures = await fetch('/api/pictures').then(res => res.json());
        ctx.pictures = pictures;
        next();
    }catch(err){

    }
}