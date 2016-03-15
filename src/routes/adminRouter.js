var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
books = [{
                name:'The Name of the wind',
                author:'Patrick Rothfluss'
            },{
                name:'The Game of thrones',
                author: 'George R. R. Martin'
            },{
                name: 'Divergent',
                author: 'Veronica Ross'
            },{
                name: 'The Alchemist',
                author: 'Paulo Coelho'
            }];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req,res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err,db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    });
            });
        });

    return adminRouter;
};

module.exports = router;
