'use strict';

import express from 'express';
import http from 'http';
import { default as routes } from 'src/routes';

import config from 'src/config';


const expressApp = express();

expressApp.use(routes({
    config: config
}));

const httpServer = http.createServer(expressApp);

console.log('__dirname index.js ', __dirname);


httpServer.listen(config.PORT, () => {
    console.log('application is running in port ', config.PORT);
})