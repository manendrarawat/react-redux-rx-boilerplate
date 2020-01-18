'use strict';

import express from 'express';
import http from 'http';

import config from 'src/config';


const expressApp = express();
const httpServer = http.createServer(expressApp);


httpServer.listen(config.PORT, () => {
    console.log('application is running in port ', config.PORT);
})