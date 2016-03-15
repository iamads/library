var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;
var nav = [{
                Link: '/Books',
                Text: 'Book'
            }, {
                Link: '/Authors',
                Text: 'Author'
            }];

var bookRouter = require('./src/routes/bookRouter')(nav);
var adminRouter = require('./src/routes/adminRouter')(nav);
var authRouter = require('./src/routes/authRouter')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req,res) {
    res.render('index',
        {
            'title': 'Hello from render',
            'nav':nav
        });
});

app.listen(port , function(err) {
    console.log('running server on port ' + port);
});
