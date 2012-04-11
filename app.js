var express = require('express'),
    //cons    = require('consolidate'), // use this instead when express 3.x gets out
    hogan   = require('hogan.js'),
    adapter = require('./lib/hogan-express.js'),
    routes  = require('./routes');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    // assign the swig engine to .html files
    //app.engine('html', cons.hogan); // use this instead when express 3.x gets out
    
    // assign .html as the default extension
    app.set('view engine', 'html');
    app.set('view options', { layout:false });
    app.set('views', __dirname + '/views');
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    
    app.register('html', adapter.init(hogan)); // using this while express 3.x isn't released
});

// Error handling
app.error(function(err, req, res, next) {
    if (req.isXMLHttpRequest) {
        console.log('error:' + err.message);
        res.send(err.message, 500);
    } else {
        next(err);
    }
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.post('/toDecimal', routes.toDecimal);
app.post('/fromDecimal', routes.fromDecimal);

app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
