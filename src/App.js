import React from 'react';

import { BrowserRouter, Route } from "react-router-dom";

import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

function App() {
  return(
    <BrowserRouter>
      <Route exact path={"/"} component={RestaurantsPage}></Route>
      <Route
        exact
        path={"/orders/:id"}
        render={props => <OrdersPage {...props} />}
      ></Route>
    </BrowserRouter>
  );
}

export default App;
