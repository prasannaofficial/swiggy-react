import React, { Component } from 'react';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import ExploreComponent from './components/ExploreComponent/ExploreComponent';
import RestaurantsPaneComponent from './components/RestaurantsPaneComponent/RestaurantsPaneComponent';

class App extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="App">
        <HeaderComponent/>
        <ExploreComponent/>
        <RestaurantsPaneComponent/>
      </div>
    );
  }
}

export default App;
