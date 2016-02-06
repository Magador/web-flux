const fs = require('fs');

module.exports = {
  server: {
    port: 443,
    https: {
      key: fs.readFileSync('certs/webflux.key'),
      cert: fs.readFileSync('certs/webflux.crt')
    }
  },
  env: "dev",
  db: {
    dev: {
      dbPath: "mongodb://localhost:28000/webflux",
      salt: '105cef7a44452de59d2d9ad7a280a67744727964'
    },
    prod: {

    }
  }
};
