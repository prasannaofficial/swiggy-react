import {
  SET_CART_MENU,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
} from "./constants";

const initialStateMenu = {
  myOrders: [],
};

export const setMenuReducer = (state = initialStateMenu, action) => {
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

const initialStateOffers = {
  offersLoaded: false,
  offers: [],
  error: "",
};

export const fetchOffersReducer = (state = initialStateOffers, action) => {
  switch (action.type) {
    case FETCH_OFFERS_PENDING:
      return {
        ...state,
        offersLoaded: false,
      };
      break;
    case FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payLoad,
        offersLoaded: true,
      };
      break;
    case FETCH_OFFERS_FAILURE:
      return {
        ...state,
        offersLoaded: false,
        error: action.payLoad,
      };
      break;
    default:
      return state;
  }
};
