import {
  SET_CART_MENU,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  FETCH_RESTAURANTSLIST,
  RESTAURANTSLIST_RECEIVED,
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

const initialStateRestaurants = {
  restaurantsListLoaded: false,
  restaurantsList: [],
  error: "",
};

export const fetchRestaurantsListReducer = (
  state = initialStateRestaurants,
  action
) => {
  switch (action.type) {
    case FETCH_RESTAURANTSLIST:
      return {
        ...state,
        restaurantsListLoaded: false,
      };
      break;
    case RESTAURANTSLIST_RECEIVED:
      return {
        ...state,
        restaurantsListLoaded: true,
        restaurantsList: action.payLoad,
      };
    default:
      return state;
  }
};
