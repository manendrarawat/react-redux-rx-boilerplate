import randomstring from 'randomstring';

export const markInProgress = (payload) => {
    payload.id = randomstring.generate({ length: 16, charset: 'numeric' });
    payload.inProgress = true;

    return payload;
}

export const markSuccess = (payload) => {
    payload.id = randomstring.generate({ length: 16, charset: 'numeric' });
    payload.inProgress = false;
    payload.hasError = false;
    return payload;
}

export const markFailure = (payload) => {
    payload.id = randomstring.generate({ length: 16, charset: 'numeric' });
    payload.inProgress = false;
    payload.hasError = true;
    return payload;
};


const actionMiddleware = (store) => (next) => (action) => {
    if (!action.payload) {
        action.payload = {};
    }

    action.payload.id = randomstring.generate({ length: 16, charset: 'numeric' });

    if (action.type.indexOf('API') === 0 || action.type.indexOf('/API') > -1) {
        
        const length = action.type.length;

    if (action.type.indexOf('SUCCESS') === length - 7) {
        action.payload.inProgress = false;
        action.payload.hasError = false;
    }
    else if (action.type.indexOf('FAILURE') === length - 7) {
        action.payload.inProgress = false;
        action.payload.hasError = true;
    }
    else {
        if (action.type.indexOf('CANCEL') !== length - 6
            || action.type.indexOf('RESET') !== length - 5) {
            action.payload.inProgress = true;
        }
    }
}

    const result = next(action);

    return result;

};

export default actionMiddleware;