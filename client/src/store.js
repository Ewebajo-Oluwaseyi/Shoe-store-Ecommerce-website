import {createStore, combineReducers, applyMiddleware} from 'redux';
import {productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer} from './reducer/productReducer';
import {cartReducer} from './reducer/cartReducer'
import {userSigninReducer} from './reducer/userReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import Cookie from 'js-cookie'

//const cartItems = Cookie.getJSON("cartItems") || [];

//const initialState= {cart: {cartItems, shipping: {}, payment: {}}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productSave: productSaveReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    productDelete: productDeleteReducer,
 //   productSearch: productSearchReducer
})


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;

/*initialState,*/