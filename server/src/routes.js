'use strict';

import express from 'express';
import path from 'path';

export default (args) => {

    const expressRouter = express.Router();

    expressRouter.get('/groceries/health-check', (req, res, next) => {
        res.success(200);
    });

    expressRouter.use('/groceries/js', express.static(path.join(__dirname, 'client/js')));
    expressRouter.use('/groceries/img', express.static(path.join(__dirname, 'client/img')));

    console.log('__dirname ', __dirname);

    expressRouter.use('/groceries', (req, res, next) => {
        // res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        // res.setHeader('Pragma', 'no-cache');
        // res.setHeader('Expires', '0');
        res.sendFile(path.join(__dirname, 'client/index.html'));
    });

    return expressRouter;


}