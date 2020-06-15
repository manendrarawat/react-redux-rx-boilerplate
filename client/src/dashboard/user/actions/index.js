export const getCurrentUserDetails = (namespace) => {
    console.log('getCurrentUserDetails :>> action', namespace);
    return {
        type: `${namespace}/API_GET_CURRENT_USER_DETAILS`
    };
};

export const getCurrentUserDetailsSuccess = (data, namespace) => {
    console.log('data :>> ', data);
    return {
        type: `${namespace}/API_GET_CURRENT_USER_DETAILS_SUCCESS`,
        payload: {
            response: data
        }
    };
};

export const getCurrentUserDetailsFailure = (data, namespace) => {
    return {
        type: `${namespace}/API_GET_CURRENT_USER_DETAILS_FAILURE`,
        payload: {
            response: data
        }
    };
};