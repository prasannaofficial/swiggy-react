import { SET_CART_MENU } from "./constants";

export const setMenuAction = (menu) => ({
  type: SET_CART_MENU,
  payLoad: menu,
});
