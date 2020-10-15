import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
// import AdminPage from "./pages/AdminPage/AdminPage";

const App = () => {
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
      document.body.classList.toggle("dark-mode");
    } else if (currentTheme == "light") {
      document.body.classList.toggle("light-mode");
    }
  }, []);

  return (
    <BrowserRouter>
      <Route exact path={"/"} component={HomePage}></Route>

      {/* USER ROUTES */}
      <Route exact path={"/restaurants"} component={RestaurantsPage}></Route>
      <Route exact path={"/orders/:id"} component={OrdersPage}></Route>
      <Route exact path={"/checkout"} component={CheckoutPage}></Route>
      <Route
        exact
        path={"/myorders"}
        render={(props) => <MyOrdersPage {...props} role="user" />}
      ></Route>

      {/* ADMIN ROUTES */}
      <Route
        exact
        path={"/admin"}
        render={(props) => <MyOrdersPage {...props} role="admin" />}
      ></Route>
    </BrowserRouter>
  );
};

export default App;
