import React,{Component} from 'react';
import Slider from "react-slick";
import './RestaurantsPage.css';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import RestCard from '../../components/RestCard';

const backendLink="https://sleepy-springs-24187.herokuapp.com";
// const backendLink="http://localhost:3000";

class RestaurantsPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            offers:[],
            restaurantsList:[]
        }
    }
    componentDidMount() {
        this.fetchOffersList();
        this.fetchRestaurantList();
    }
    fetchOffersList() {
        fetch(backendLink+"/api/offers")
            .then(res => res.json())
            .then( result => this.setState({offers:result.offers}), console.log)
    }
    fetchRestaurantList() {
        fetch(backendLink+"/api/restaurants")
            .then(res => res.json())
            .then( result => this.setState({restaurantsList:result.restaurantsList}), console.log)
    }

    slickSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    }
    render(){
        return(
            <>
                <HeaderComponent/>
                <section className="explore-pane">
                    <Slider className="image-container main-container" {...this.slickSettings}>
                        {this.state.offers.map(image => <img className="explore-img" src={image}/>)}
                    </Slider>
                </section>
                <section className="restaurants-pane">
                    <div className="rest-head main-container">
                        <h1>{this.state.restaurantsList.length} restaurants</h1>
                        <ul>
                            <li><span>Relavance</span></li>
                            <li>Cost For Two</li>
                            <li>Delivery Time</li>
                            <li>Rating</li>
                            <li>
                                <span>Filters</span>
                                <ion-icon name="funnel-outline"></ion-icon>
                            </li>
                        </ul>
                    </div>
                    <div className="rest-cards-container main-container">
                        <div className="rest-cards-row">
                        { this.state.restaurantsList.map((obj) => <RestCard obj={obj} history={this.props.history} />) }
                        </div>
                    </div>
                </section>
            </>
        );
    };
}

export default RestaurantsPage;