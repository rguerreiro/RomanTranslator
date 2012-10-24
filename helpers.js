var express     = require('express'),
    hogan       = require('hogan.js'),
    languages   = require('./languages'),
    utils       = require('./lib/utils.js');

exports.namespace = 'express';

express.application.setCommonHelpers = function () {
    var app = this.app || this;
    
    var language = function (req, res, next) {
        var curr_language = req.cookies.lang;
        
        if (!curr_language || !languages.isSupported(curr_language)) 
            curr_language = languages.default.code;
        
        res.locals.curr_language = curr_language;
        
        if (next) next();
    };
    app.use(language);
    
    var inProduction = function (req, res, next) {
        res.locals.inProduction = utils.getEnv() === 'production';
        if (next) next();
    };
    app.use(inProduction);
    
    var inDevelopment = function (req, res, next) {
        res.locals.inDevelopment = utils.getEnv() === 'development';
        if (next) next();
    };
    app.use(inDevelopment);
    
    var languageHtml = function (req, res, next) {
        var curr_language = req.cookies.lang;
        if (!curr_language || !languages.isSupported(curr_language)) curr_language = languages.default.code;
        
        var html = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + languages[curr_language].name + '<b class="caret"></b></a><ul class="dropdown-menu">';
        
        for(var i = 0; i < languages.supported.length; ++i){
            var lang = languages.supported[i];
            if(lang !== curr_language) {
                html = html.concat('<li><a href="/language/' + lang + '">' + languages[lang].name + '</a></li>');
            }
        }

        html = html.concat('</ul></li>');
        res.locals.languageHtml = html;
        
        if (next) next();
    };
    app.use(languageHtml);
    
    var env = function (req, res, next) {
        res.locals.env = utils.getEnv();
        if (next) next();
    };
    app.use(env);
    
    var version = function (req, res, next) {
        res.locals.version = utils.getVersion();
        if (next) next();
    };
    app.use(version);
    
    var script = function (req, res, next) {
        res.locals.script = function(content) { 
            var template = hogan.compile(content);
            res.locals.script_section = template.render({ 
                resource: function(resource_code) {
	            	var lang = req.cookies.lang;
		            if (!lang || !languages.isSupported(lang)) lang = languages.default.code;
		            
		            console.log('resource ' + resource_code + ' for language ' + lang);
		            return languages[lang].translate(resource_code);
            	} 
            });
            return '';
        };
        
        if (next) next();
    };
    app.use(script);
    
    var resource = function (req, res, next) {
        res.locals.resource = function(resource_code) {
            var lang = req.cookies.lang;
            if (!lang || !languages.isSupported(lang)) lang = languages.default.code;
            
            if(resource_code.indexOf('{{') >= 0) {
            	console.log('resource ' + resource_code + ' is a variable');
            	var template = hogan.compile(resource_code);
            	resource_code = template.render({ 
	            	device: req.device.type
	            });
            }
            
            console.log('resource ' + resource_code + ' for language ' + lang);
            return languages[lang].translate(resource_code);
        };
        
        if (next) next();
    };
    app.use(resource);
};