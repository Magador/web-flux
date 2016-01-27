const fs = require('fs');

const config = {
  server: {
    port: 8000,
    https: {
      key: fs.readFileSync('certs/webflux.key'),
      cert: fs.readFileSync('certs/webflux.crt')
    }
  }
};

module.exports = config;
