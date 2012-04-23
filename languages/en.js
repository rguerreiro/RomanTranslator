var Language = require('lingo').Language,
    en = new Language('en', 'English');

en.translations = {
  'site title': 'Roman Number Converter',
  'site description': 'This is a simple roman number converter using node.js as backend',
  'developed by': 'Developed by <a href="https://twitter.com/#!/rguerreiro">@rguerreiro</a> with the sole purpose to sharpen his node.js skills.',
  'references': 'Favicon taken from <a href="http://www.famfamfam.com/lab/icons/silk/">famfamfam</a>. Hosted at <a href="http://www.heroku.com/">Heroku</a> and running on <a href="http://expressjs.com/">express.js</a>.',
  'decimal placeholder': 'from decimal...',
  'roman placeholder': 'to decimal...',
  'to roman': 'To Roman numbers',
  'from roman': 'From Roman numbers',
  'convert': 'Convert',
  'error': 'Error',
  'unexpected error': 'Something went terribly wrong',
  'ExceededMaximumNumberOfTimes': 'The character ... \'{char}\' can only be used a maximum of {max_times} time(s)'
};

module.exports = en;