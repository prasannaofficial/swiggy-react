import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleWare from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  setMenuReducer,
  fetchOffersReducer,
  fetchRestaurantsListReducer,
} from "./redux/reducer";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  setMenuReducer,
  fetchOffersReducer,
  fetchRestaurantsListReducer,
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleWare, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.registerServiceWorker();
serviceWorker.unregister();
