var express   = require('express'),
    util      = require('util'),
    device    = require('express-device'),
    cons      = require('consolidate'),
    hogan     = require('hogan.js'),
    partials  = require('express-partials'),
    routes    = require('./routes'),
    languages = require('./languages'),
    helpers   = require('./helpers.js');

var app = express();

function setLanguage(req, res, next) {
    if (typeof req.params.lang !== 'undefined' && languages.isSupported(req.params.lang)) {
        console.log('setting language \'' + req.params.lang + '\'');
        res.clearCookie('lang');
        res.cookie('lang', req.params.lang, { path: '/' });
        req.cookies.lang = req.params.lang;
        hogan.cache = {};
    } else if (typeof req.cookies.lang === 'undefined') {
        console.log('setting to default language: \'' + languages.default.code +'\'');
        res.cookie('lang', languages.default.code, { path: '/' });
    }
    
    if(next) next();
}

function PageNotFoundError(message){
    this.name = 'PageNotFoundError';
    Error.call(this, message);
    Error.captureStackTrace(this, arguments.callee);
}

PageNotFoundError.prototype.__proto__ = Error.prototype;

// Configuration
app.configure(function(){
    app.engine('html', cons.hogan);
    
    // assign .html as the default extension
    app.set('view engine', 'html');
    app.set('view options', { layout: true });
    app.set('views', __dirname + '/views');
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(device.capture());
    app.use(partials());
    
    app.enableDeviceHelpers();
    app.setCommonHelpers();
    
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    
    app.use(function(req, res, next) {
        console.log('reached PageNotFoundError use');
        next(new PageNotFoundError())
    });
    
    app.use(function(err, req, res, next) {
        if (err instanceof PageNotFoundError) {
            console.log('got a 404');
            res.redirect('/');
        } else if (req.isXMLHttpRequest) {
        	var lang = req.cookies.lang;
            if (!lang || !languages.isSupported(lang)) lang = languages.default.code;
            console.log('resource ' + err.name + ' for language ' + lang);
            var errorTranslation = languages[lang].translate(err.name, err.arguments);
            if(errorTranslation && errorTranslation !== err.name) {
            	console.log('error in ajax req:' + errorTranslation);
            	res.send(errorTranslation, 500);
            } else {
            	console.log('error in ajax req:' + err.message);
            	res.send(err.message, 500);
            }
        } else {
            console.log('error:' + err.message);
            res.render('500', {
                status: 500,
                error: util.inspect(err),
                showDetails: app.settings.showErrorDetails
            });
        }
    });
});

// Routes
app.get('/*', setLanguage);
app.get('/', routes.index);
app.get('/throwError', routes.throwError);
app.post('/toDecimal', routes.toDecimal);
app.post('/fromDecimal', routes.fromDecimal);
app.get('/language/:lang', function (req, res) {
	console.log('going to change language');
    setLanguage(req, res);
    res.redirect('home');
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Express server listening on port %d in %s mode", port, app.settings.env);
