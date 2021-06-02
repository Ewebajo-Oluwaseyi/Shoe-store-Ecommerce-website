import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
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
} from '../types'

const initialState = {
    products: null,
    loading: false,
    error: null,
    search: null

}

function productListReducer(state =initialState, action) {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{
                loading: true,
            }
        case PRODUCT_LIST_SUCCESS:
            return{
                loading: false,
                products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
            case SEARCH_PRODUCT:
                return{
                    ...state,
                    search: state.products.filter(product => {
                        const regex = new RegExp(`${action.payload}`, 'gi');
                        return product.name.match(regex)
                    })
                }
            case CLEAR_PRODUCT:
                return{
                    ...state,
                    search: null
                }

        default:
            return {...state}
    }

}

function productDetailReducer(state = { product: {}}, action) {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }


        default:
            return {...state}
    }

}

function productSaveReducer(state = { product: {}}, action) {
    switch(action.type){
        case PRODUCT_SAVE_REQUEST:
            return{
                loading: true,
            }
        case PRODUCT_SAVE_SUCCESS:
            return{
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCT_SAVE_FAIL:
            return{
                loading: false,
                error: action.payload
            }


        default:
            return {...state}
    }

}

function productDeleteReducer(state = { product: {}}, action) {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return{
                loading: true,
            }
        case PRODUCT_DELETE_SUCCESS:
            return{
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCT_DELETE_FAIL:
            return{
                loading: false,
                error: action.payload
            }


        default:
            return {...state}
    }

}

/*function productSearchReducer(state = initialState, action) {
    switch(action.type){
        case SEARCH_PRODUCT:
            return{
                ...state,
                search: state.products.filter(product => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return product.name.match(regex)
                })
            }
        case CLEAR_PRODUCT:
            return{
                ...state,
                search: null
            }


        default:
            return {...state}
    }

}*/

export{productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer,}