var express = require('express'),
    util    = require('util'),
    //cons    = require('consolidate'), // use this instead when express 3.x gets out
    hogan   = require('hogan.js'),
    adapter = require('./lib/hogan-express.js'),
    routes  = require('./routes'),
    utils   = require('./lib/utils.js');

var app = module.exports = express.createServer();

function PageNotFoundError(message){
    this.name = 'PageNotFoundError';
    Error.call(this, message);
    Error.captureStackTrace(this, arguments.callee);
}

PageNotFoundError.prototype.__proto__ = Error.prototype;

// Configuration
app.configure(function(){
    // assign the swig engine to .html files
    //app.engine('html', cons.hogan); // use this instead when express 3.x gets out
    
    // assign .html as the default extension
    app.set('view engine', 'html');
    app.set('view options', { layout: false });
    app.set('views', __dirname + '/views');
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    
    app.register('html', adapter.init(hogan)); // using this while express 3.x isn't released
});

// Error handling
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(function(req, res, next) {
        console.log('reached PageNotFoundError use');
        next(new PageNotFoundError())
    });
    app.error(function(err, req, res, next) {
        if (err instanceof PageNotFoundError) {
            console.log('got a 404');
            res.redirect('/');
        } else if (req.isXMLHttpRequest) {
            console.log('error in ajax req:' + err.message);
            res.send(err.message, 500);
        } else {
            console.log('error:' + err.message);
            res.render('500', {
                status: 500,
                title: 'Roman Number Converter', 
                version: utils.getVersion(), 
                env: process.env.NODE_ENV || 'development',
                error: util.inspect(err),
                showDetails: app.settings.showErrorDetails
            });
        }
    });
});

// Routes
app.get('/', routes.index);
app.get('/throwError', routes.throwError);
app.post('/toDecimal', routes.toDecimal);
app.post('/fromDecimal', routes.fromDecimal);

app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
