import axios from "axios";
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    SEARCH_PRODUCT,
    CLEAR_PRODUCT
}
    from "../types";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST});

        const {data} = await axios.get("/api/product/")
    //    console.log(data)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: error.message
        })
    }

}


export const saveProduct = (product) => async (dispatch, getState) => {
    const token = getState().userSignin.token;

    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});

        if(!product._id){
            const {data} = await axios.post("/api/product", product, {
                headers: {
                    'Authorization': 'Bearer' + token
                }
            });

            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        } else {
            const {data} = await axios.put("/api/product/" + product._id, product, {
                headers: {
                    'Authorization': 'Bearer' + token
                }
            });

            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        }


    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}


export const detailsProduct = (productId) => async (dispatch) => {
    console.log(productId)
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});

        const{data} = await axios.get("/api/product/" + productId);
        console.log(data)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, payload: error.message
        })
    }
}



export const deleteProduct = (productId) => async (dispatch, getState) => {


    try {
        const token = getState().userSignin.token;
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});

        const{data} = await axios.delete("/api/product/" + productId, {
            headers: {
                'Authorization': 'Bearer' + token
            }
        });

        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true})
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, payload: error.message
        })
    }
}

export const  searchProducts = (text) => async dispatch => {
    console.log(text)
    try {

        dispatch({
            type: SEARCH_PRODUCT,
            payload: text
        })
    } catch (err) {

    }


}

//clear search
export const clearSearch = () => {
    return{
        type: CLEAR_PRODUCT
    }
}

