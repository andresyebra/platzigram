var page = require('page');
var empty = require('empty-element');
var template = require('./template');
// var title = require('title');

// Route signup page
page('/signin', function (ctx, next) {
    // title('Platzigram - Signin');
    $('title').html('Platzigram - Signin');
    var main = document.getElementById('main-container');
    empty(main).appendChild(template);
});
