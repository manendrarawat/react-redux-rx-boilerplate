export const sessionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_SESSION': {
            return Object.assign({}, state, Object.assign({}, state.session, action.payload.data));
        }

        case 'REMOVE_SESSION': {
            return {};
        }

        default: {
            return state;
        }
    }
};