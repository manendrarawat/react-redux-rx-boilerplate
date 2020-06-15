export const getCurrentUserDetailsReducer = (namespace) => (state = {}, action) => {
    switch (action.type) {
        case `${namespace}/API_GET_CURRENT_USER_DETAILS`: {
            return Object.assign({}, action.payload);
        }

        case `${namespace}/API_GET_CURRENT_USER_DETAILS_SUCCESS`:
        case `${namespace}/API_GET_CURRENT_USER_DETAILS_FAILURE`: {
            return Object.assign({}, state, action.payload);
        }

        default: {
            return state;
        }
    }
};
