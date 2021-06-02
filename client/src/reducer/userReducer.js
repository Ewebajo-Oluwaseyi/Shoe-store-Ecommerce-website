import {
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
}
    from "../types";


 const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
    };




function userSigninReducer(state = initialState, action) {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
             }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
                }
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('user')
                return{
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                    error: action.payload
                        };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
                return{
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                    error: action.payload
                        };
        default:
            return {...state}
    }

}

export{userSigninReducer}