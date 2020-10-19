import {
  SET_CART_MENU,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  FETCH_RESTAURANTSLIST,
} from "./constants";
import { backendLink } from "../constants";

export const setMenuAction = (menu) => ({
  type: SET_CART_MENU,
  payLoad: menu,
});

export const fetchOffersAction = () => (dispatch) => {
  dispatch({ type: FETCH_OFFERS_PENDING });
  let myHeaders = new Headers();
  myHeaders.append("x-access-token", localStorage.getItem("token"));
  fetch(backendLink + "/api/offers", {
    method: "GET",
    headers: myHeaders,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.verifiedUser === true) {
        return dispatch({ type: FETCH_OFFERS_SUCCESS, payLoad: res.offers });
      } else {
        return dispatch({
          type: FETCH_OFFERS_FAILURE,
          payLoad: "Not verified user",
        });
      }
    })
    .catch((err) => dispatch({ type: FETCH_OFFERS_FAILURE, payLoad: err }));
};

export const fetchRestaurantsListAction = () => {
  return {
    type: FETCH_RESTAURANTSLIST,
  };
};
