const fs = require('fs');

module.exports = {
  server: {
    port: 8000,
    https: {
      key: fs.readFileSync('certs/webflux.key'),
      cert: fs.readFileSync('certs/webflux.crt')
    }
  },
  env: "dev",
  db: {
    dev: {
      protocol: 'mongodb',
      slashes: true,
      hostname: 'jblenglet.org.uk',
      port: 28000,
      pathname: 'webflux'
    },
    prod: {

    }
  }
};
