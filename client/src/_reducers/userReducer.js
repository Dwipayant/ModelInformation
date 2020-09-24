import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    ON_EDIT_MODELS
} from '../_actions/types';

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state,
                register: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                loginSucces: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state 
            }
        case ON_EDIT_MODELS:
            return {
                ...state,
                userData:{
                    ...state.userData,
                    model: action.payload
                }
            }
        default:
            return state;
    }
}