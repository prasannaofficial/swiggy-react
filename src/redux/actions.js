import { SET_CART_MENU } from "./constants";

export const setMenu = (menu) => ({
    type: SET_CART_MENU,
    payLoad: menu,
});
