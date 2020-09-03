import React,{Component} from 'react';
import './RestaurantsPage.css';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import ExploreComponent from '../../components/ExploreComponent/ExploreComponent';
import RestaurantsPaneComponent from '../../components/RestaurantsPaneComponent/RestaurantsPaneComponent';

class RestaurantsPage extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <>
                <HeaderComponent/>
                <ExploreComponent/>
                <RestaurantsPaneComponent
                    history={this.props.history}
                />
            </>
        );
    };
}

export default RestaurantsPage;