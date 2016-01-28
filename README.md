# WebFlux

## Installation

This project requires [Node JS](https://nodejs.org) in order to work, [Node Package Manager](https://npmjs.org) to install packages and [Bower](http://bower.io/) to handle JS components.
When installing NodeJS, NPM should be installed automatically as well.

Go to the `web-flux` directory:

```
npm install
cd public
bower install
```

## Start-up

Start the mongo daemon
```
cd /path/to/project/db
mongod -f config.yaml --logpath mongod.log --dbpath data
```

Start the app
```
npm start
```

By default, WebFlux starts on port 8000
