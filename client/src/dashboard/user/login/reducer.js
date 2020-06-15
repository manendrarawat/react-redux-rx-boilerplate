import { combineReducers } from 'redux';

import {
    getCurrentUserDetailsReducer
} from 'src/dashboard/user/reducers';

const reducer = combineReducers({
    userDetails: getCurrentUserDetailsReducer('session'),
});

export default {
    session: (state, action) => {
        switch (action.type) {
            case 'session/RESET_PAGE_STATE': {
                return reducer({
                    currentUserDetails: {}
                }, action);
            }

            default: {
                return reducer(state, action);
            }
        }
    },
};
