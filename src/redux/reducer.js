import { SET_CART_MENU } from "./constants";

const initialState = {
    myOrders: [],
};

export const setMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART_MENU:
            return {
                ...state,
                myOrders: action.payLoad,
            };
            break;
        default:
            return state;
    }
};
