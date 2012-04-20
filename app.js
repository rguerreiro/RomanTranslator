var express   = require('express'),
    util      = require('util'),
    //cons      = require('consolidate'), // use this instead when express 3.x gets out
    hogan     = require('hogan.js'),
    adapter   = require('./lib/hogan-express.js'),
    routes    = require('./routes'),
    languages = require('./languages'),
    utils     = require('./lib/utils.js');

var app = module.exports = express.createServer();

function setCookie(req, res, next) {
    if (typeof req.params.lang !== 'undefined' && languages.isSupported(req.params.lang)) {
        console.log('setting language \'' + req.params.lang + '\'');
        res.clearCookie('lang');
        res.cookie('lang', req.params.lang, { path: '/' });
        languages.set(req.params.lang);
    } else if (typeof req.cookies.lang === 'undefined') {
        console.log('setting to default language: \'' + languages.default.code +'\'');
        res.cookie('lang', languages.default.code, { path: '/' });
    } else {
		console.log('setting current language to \'' + req.cookies.lang + '\'');
		languages.set(req.cookies.lang);
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
    // assign the swig engine to .html files
    //app.engine('html', cons.hogan); // use this instead when express 3.x gets out
    
    // assign .html as the default extension
    app.set('view engine', 'html');
    app.set('view options', { layout: true });
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
                error: util.inspect(err),
                showDetails: app.settings.showErrorDetails
            });
        }
    });
});

app.dynamicHelpers({
    language: function(req, res) {
        return languages.current.code;
    },
    languageHtml: function(req, res) {
        var curr_language = languages.current.code;
        var html = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + languages[curr_language].name + '<b class="caret"></b></a><ul class="dropdown-menu">';
        
        for(var i = 0; i < languages.supported.length; ++i){
            var lang = languages.supported[i];
            if(lang !== curr_language) {
                html = html.concat('<li><a href="language/' + lang + '">' + languages[lang].name + '</a></li>');
            }
        }

        html = html.concat('</ul></li>');
        return html;
    },
    env: function(req, res){
        return utils.getEnv();
    },
    version: function(req, res){
        return utils.getVersion();
    },
    script: function(req, res){
        return function(content) { 
            res.local('script_section', content);
            return '';
        };
    },
    resource: function(req, res){
        return function(resource_code) {
            var lang = req.cookies.lang;
            if (!lang || !languages.isSupported(lang)) lang = languages.default.code;
            
            console.log('resource ' + resource_code + ' for language ' + lang);
            return languages[lang].translate(resource_code);
        }
    }
});

// Routes
app.get('/*', setCookie);
app.get('/', routes.index);
app.get('/throwError', routes.throwError);
app.post('/toDecimal', routes.toDecimal);
app.post('/fromDecimal', routes.fromDecimal);
app.get('/language/:lang', function (req, res) {
    setCookie(req, res);
    res.redirect('/');
});

app.listen(process.env.PORT);

console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
