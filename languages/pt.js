var Language = require('lingo').Language,
    pt = new Language('pt', 'Português');

pt.translations = {
  'site title': 'Conversor de Números Romanos',
  'site description': 'Um simples conversor de números romanos construído sobre node.js',
  'developed by': 'Desenvolvido pelo <a href="https://twitter.com/#!/rguerreiro">@rguerreiro</a> com o intuito de melhorar as suas capacidades de <a href="http://nodejs.org/">node.js</a>.',
  'references': 'Favicon retirado do <a href="http://www.famfamfam.com/lab/icons/silk/">famfamfam</a>. Hospedado no <a href="http://www.heroku.com/">Heroku</a> e a correr sobre <a href="http://expressjs.com/">express.js</a>.',
  'decimal placeholder': 'para romanos...',
  'roman placeholder': 'para decimais...',
  'to roman': 'De números Decimais',
  'from roman': 'De números Romanos',
  'convert': 'Converter',
  'error': 'Erro',
  'unexpected error': 'Aconteceu algo de muito errado',
  'EmptyRomanString': 'Número vazio',
  'ExceededMaximumNumberOfTimes': 'O caracter \'{char}\' só pode ser usado até um máximo de {max_times} vez(es)',
  'MisplacedCharacter': 'O caracter \'{char}\' está mal colocado na posição {position}',
  'CharacterInvalidPosition': 'O caracter \'{char}\' na posição {position} não é válido',
  'ExceededMaximumValue': 'Os números romanos só podem ir ate um máximo de MMMDCCCLXXXVIII (3888)',
  'NotImplemented': 'Não está implementado',
  'qr code title': 'Experimente este site no seu telemóvel',
  'EmptyDecimalNumber': 'Não foi enviado nenhum número',
  'NotNumber': '{number} não é um número válido',
  'NotPositive': 'Número tem de ser maior que 0',
  'MustBeLower': 'Número tem de ser menor 3888',
  'optimized to': 'Optimizado para o seu',
  'phone': 'telemóvel',
  'desktop': 'computador',
  'tv': 'tv',
  'tablet': 'tablet',
  'get the code': 'Obtenha o código no <a href="http://github.com/rguerreiro/romantranslator">Github.</a>'
};

module.exports = pt;