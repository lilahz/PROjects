const login = () => {
    return dispatch => {
        dispatch({type: 'login'})
    }
};

const logout = ()  => {
    return dispatch => {
        dispatch({type: 'logout'})
    }
};

export const authActions = {
    login,
    logout
}; 