const fs = require('fs');

fs.readdirSync(__dirname)
  .filter((f) => (f.indexOf('.') !== 0) && (f !== 'load.js'))
  .forEach((f) => module.exports[f.replace(/\.js$/, '')] = require('./' + f));
