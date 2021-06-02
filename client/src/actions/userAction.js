import axios from "axios";
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





export const loaduser = (props) => async (dispatch, getState) => {
    const token = getState().userSignin.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token) {
        config.headers['x-Auth-token'] = token;
    }


    try {
        const res = await axios.get("/api/auth", config);
        localStorage.setItem('user', JSON.stringify(res.data.isAdmin))

        let Authuser = JSON.parse(localStorage.getItem('user'))
        if(Authuser === 'Client') {
            props.history.push('/');
        } else if (Authuser === 'Admin') {
            props.history.push('/products');
        }
        dispatch({ type: USER_LOADED, payload: res.data});


    } catch (error) {
        dispatch({ type: AUTH_ERROR});

    }

}


export const login =  (props, formData) => async (dispatch) => {
   // console.log(props)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
   try {
        const res = await axios.post('/api/auth', formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

       // loaduser();

    } catch (err) {
       dispatch({
           type: LOGIN_FAIL,
           payload: err.response.data.msg
       })
    }
}

export const register = formData => async (dispatch) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        //loaduser();

        } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        })
        }
    }


export const logout = () => async (dispatch) => dispatch({type: LOGOUT})








