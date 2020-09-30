import React, { Component } from "react";
import Slider from "react-slick";
import "./RestaurantsPage.css";
import "../skeletonLoader.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import RestCard from "../../components/RestCard";

// const backendLink="https://sleepy-springs-24187.herokuapp.com";
const backendLink = "http://localhost:3000";

class RestaurantsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            offersLoaded: false,
            restaurantsList: [],
            restaurantsListLoaded: false,
        };
    }
    componentDidMount() {
        this.fetchOffersList();
        this.fetchRestaurantList();
    }

    fetchOffersList = async () => {
        let myHeaders = new Headers();
        myHeaders.append("x-access-token", localStorage.getItem("token"));
        const response = await fetch(backendLink + "/api/offers", {
            method: "GET",
            headers: myHeaders,
        });
        const json = await response.json();
        if (json.verifiedUser === false) {
            localStorage.setItem("token", "");
            this.props.history.push("/");
            return;
        }
        this.setState({ offers: json.offers, offersLoaded: true });
    };
    fetchRestaurantList = async () => {
        let myHeaders = new Headers();
        myHeaders.append("x-access-token", localStorage.getItem("token"));
        const response = await fetch(backendLink + "/api/restaurants", {
            method: "GET",
            headers: myHeaders,
        });
        const json = await response.json();
        if (json.verifiedUser === false) {
            localStorage.setItem("token", "");
            this.props.history.push("/");
            return;
        }
        this.setState({
            restaurantsList: json.restaurantsList,
            restaurantsListLoaded: true,
        });
    };

    slickSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };
    render() {
        return (
            <>
                <HeaderComponent history={this.props.history} />
                <section className="explore-pane">
                    {this.state.offersLoaded ? (
                        <Slider
                            className="image-container main-container"
                            {...this.slickSettings}
                        >
                            {this.state.offers.map((image) => (
                                <img className="explore-img" src={image} />
                            ))}
                        </Slider>
                    ) : (
                        <div className="loader-explore-pane">
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <img
                                    className="spinner-icon"
                                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                                />
                            </div>
                            <div className="loader-text">
                                Looking for great food near you ...
                            </div>
                        </div>
                    )}
                </section>
                <section className="restaurants-pane">
                    {this.state.restaurantsListLoaded ? (
                        <>
                            <div className="rest-head main-container">
                                <h1>
                                    {this.state.restaurantsList.length}{" "}
                                    restaurants
                                </h1>
                                <ul>
                                    <li>
                                        <span>Relavance</span>
                                    </li>
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
                                    {this.state.restaurantsList.map((obj) => (
                                        <RestCard
                                            obj={obj}
                                            history={this.props.history}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="loader-restaurants-pane main-container">
                            <div className="loader-heading"></div>
                            <div className="loader-card-row">
                                <div className="loader-card">
                                    <div className="loader-card-row1"></div>
                                    <div className="loader-card-row2"></div>
                                    <div className="loader-card-row3"></div>
                                </div>
                                <div className="loader-card">
                                    <div className="loader-card-row1"></div>
                                    <div className="loader-card-row2"></div>
                                    <div className="loader-card-row3"></div>
                                </div>
                                <div className="loader-card">
                                    <div className="loader-card-row1"></div>
                                    <div className="loader-card-row2"></div>
                                    <div className="loader-card-row3"></div>
                                </div>
                                <div className="loader-card">
                                    <div className="loader-card-row1"></div>
                                    <div className="loader-card-row2"></div>
                                    <div className="loader-card-row3"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </>
        );
    }
}

export default RestaurantsPage;
