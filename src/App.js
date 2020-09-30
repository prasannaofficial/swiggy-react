import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme == "dark") {
            document.body.classList.toggle("dark-mode");
        } else if (currentTheme == "light") {
            document.body.classList.toggle("light-mode");
        }
    }
    ordersState = {};
    setOrdersState(ordersState) {
        this.ordersState = ordersState;
    }
    render() {
        return (
            <BrowserRouter>
                <Route exact path={"/"} component={HomePage}></Route>
                <Route
                    exact
                    path={"/restaurants"}
                    component={RestaurantsPage}
                ></Route>
                {/* <Route exact path={"/orders/:id"} render={(props)=><OrdersPage {...props} setMenu={(state)=>this.setOrdersState(state)}/>}></Route>
        <Route exact path={"/checkout"} render={(props) => <CheckoutPage {...props} ordersState={this.ordersState}/>}></Route> */}
                <Route
                    exact
                    path={"/orders/:id"}
                    component={OrdersPage}
                ></Route>
                <Route
                    exact
                    path={"/checkout"}
                    component={CheckoutPage}
                ></Route>
                <Route
                    exact
                    path={"/myorders"}
                    component={MyOrdersPage}
                ></Route>
            </BrowserRouter>
        );
    }
}

export default App;
