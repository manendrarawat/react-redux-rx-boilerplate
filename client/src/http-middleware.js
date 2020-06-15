import axios from 'axios';
import { Service } from 'axios-middleware';
import randomstring from 'randomstring';

export default {
    run: (store) => {
        const service = new Service(axios);

        service.register({
            onRequest(config) {
                if (!config.timeout) {
                    config.timeout = 5000;
                }

                config.params = {};
                config.params.version = randomstring.generate({ length: 12, charset: 'numeric' });
                return config;
            },

            onRequestError(error) {
                throw error;
            },

            onResponse(response) {
                return response;
            },

            onResponseError(error) {
                throw error;
            }
        });
    }
};