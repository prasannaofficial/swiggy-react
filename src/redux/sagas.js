import { FETCH_RESTAURANTSLIST, RESTAURANTSLIST_RECEIVED } from "./constants";
import { backendLink } from "../constants";

import { put, takeLatest, all } from "redux-saga/effects";
function* fetchRestaurantsList() {
  let myHeaders = new Headers();
  myHeaders.append("x-access-token", localStorage.getItem("token"));
  const json = yield fetch(backendLink + "/api/restaurants", {
    method: "GET",
    headers: myHeaders,
  }).then((response) => response.json());
  yield put({
    type: RESTAURANTSLIST_RECEIVED,
    payLoad: json.restaurantsList,
  });
}
function* actionWatcher() {
  yield takeLatest(FETCH_RESTAURANTSLIST, fetchRestaurantsList);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
