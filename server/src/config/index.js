'use strict';

import path from 'path';

const env = process.env.ENV || 'local';
const config = Object.assign({ ENV: env }, require(path.join(__dirname, env.toLowerCase())));

export default config;