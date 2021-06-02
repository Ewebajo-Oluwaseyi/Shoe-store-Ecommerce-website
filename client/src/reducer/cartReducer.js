import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT,
    CART_GET_ITEM,
    CART_UPDATE_ITEM
} from '../types'

const initialState = {
    cartItems: [],
    shipping: {},
    payment: {}

}

function cartReducer(state =initialState, action) {
    switch(action.type){
        case CART_GET_ITEM:
            const item = action.payload;
          /* const product = state.cartItems.find(x => x.product === item.product);
            if(product){
                return{
                    cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
                };
            };*/

            return {...state, cartItems: item};
        case CART_ADD_ITEM:
            return {
                ...state, cartItems: [action.payload, ...state.cartItems]
            }
        case CART_REMOVE_ITEM:
            return{
                cartItems: state.cartItems.filter(x => x._id !== action.payload)
            }
        case CART_UPDATE_ITEM :
           // console.log(action.payload)
            return {
                cartItems: state.cartItems.map(x => x._id === action.payload._id ? action.payload: x)
            }
        case CART_SAVE_SHIPPING:
            return{
                ...state,
                shipping: action.payload
            }
        case CART_SAVE_PAYMENT:
            return{
                ...state,
                payment: action.payload
            }
        default:
             return state
    }
}

export{cartReducer}