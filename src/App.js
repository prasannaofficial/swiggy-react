import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import ChatPage from "./pages/ChatPage/ChatPage";
// import UserChat from "./pages/ChatPage/UserChat";
// import AdminChat from "./pages/ChatPage/AdminChat";

// import { requestFirebaseNotificationPermission } from "./firebaseInit";

const App = () => {
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
      document.body.classList.toggle("dark-mode");
    } else if (currentTheme == "light") {
      document.body.classList.toggle("light-mode");
    }
    // requestFirebaseNotificationPermission()
    //   .then((firebaseToken) => {
    //     console.log(firebaseToken);
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
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
      <Route
        exact
        path={"/chat"}
        render={(props) => <ChatPage {...props} role="user" />}
      ></Route>
      {/* <Route exact path={"/chat"} component={ChatPage}></Route> */}

      {/* ADMIN ROUTES */}
      <Route
        exact
        path={"/admin"}
        render={(props) => <MyOrdersPage {...props} role="admin" />}
      ></Route>
      <Route
        exact
        path={"/adminchat"}
        render={(props) => <ChatPage {...props} role="admin" />}
      ></Route>
      {/* <Route exact path={"/adminchat"} component={AdminChat}></Route> */}
    </BrowserRouter>
  );
};

export default App;
