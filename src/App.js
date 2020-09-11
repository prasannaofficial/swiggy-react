import React,{Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
      document.body.classList.toggle("dark-mode");
    } else if (currentTheme == "light") {
      document.body.classList.toggle("light-mode");
    }
  }
  render(){
    return(
      <BrowserRouter>
        <Route exact path={"/"} component={HomePage}></Route>
        <Route exact path={"/restaurants"} component={RestaurantsPage}></Route>
        <Route exact path={"/orders/:id"} render={props => <OrdersPage {...props} />}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
