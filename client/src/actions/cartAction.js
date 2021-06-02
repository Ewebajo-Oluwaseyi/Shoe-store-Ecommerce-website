import {
    CART_ADD_ITEM,
    CART_GET_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT,
    CART_UPDATE_ITEM
} from '../types'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'

export const getCart = (qty) => async (dispatch, getState) => {

    try {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        const {data} = await axios.get("/api/cart")

        dispatch({ type: CART_GET_ITEM, payload: data});

       // const {cart: {cartItems}} = getState();
       // Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {

    }
}


export const addCart = (cart, qty, productid) => async (dispatch) => {
  //  console.log(productid)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post("/api/cart", {
            product: cart._id,
            name: cart.name,
            image: cart.image,
            price: cart.price,
            countInStock: cart.countInStock,
            qty: qty,
            productId: productid
        }, config)
     //   console.log(data)
        dispatch({ type: CART_ADD_ITEM, payload: data});

       // const {cart: {cartItems}} = getState();
       // Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {

    }
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
    //console.log(productId)
    try {
        dispatch({ type: CART_REMOVE_ITEM, payload: productId });
        await axios.delete(`/api/cart/${productId}`);

      //  const {cart: {cartItems}} = getState();
       // Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {

    }
}

export const updateFromCart = (qty, item, _id) => async (dispatch, getState) => {
    //console.log(productId)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} =  await axios.put(`/api/cart/${_id}`,  {
            product: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            countInStock: item.countInStock,
            qty: qty,
            productId: item.productId
        }, config);
      //  console.log(data)
        dispatch({ type: CART_UPDATE_ITEM, payload: data });


      //  const {cart: {cartItems}} = getState();
       // Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {

    }
}




export const saveShipping = (data) => async (dispatch) => {
    //console.log(data)

    dispatch({ type: CART_SAVE_SHIPPING, payload: data });


}

export const savePayment = (data) => async (dispatch) => {
    //console.log(data)
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });

}