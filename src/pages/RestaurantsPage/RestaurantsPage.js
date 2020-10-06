import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./RestaurantsPage.css";
import "../skeletonLoader.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import RestCard from "../../components/RestCard";
import { backendLink } from "../../constants";
import { fetchOffersAction } from "../../redux/actions";

const mapStateTOProps = (state) => {
  return {
    offers: state.fetchOffersReducer.offers,
    offersLoaded: state.fetchOffersReducer.offersLoaded,
    error: state.fetchOffersReducer.error,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    fetchOffersAction: () => dispath(fetchOffersAction()),
  };
};
const RestaurantsPage = (props) => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [restaurantsListLoaded, setRestaurantsListLoaded] = useState(false);
  const fetchRestaurantList = async () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    const response = await fetch(backendLink + "/api/restaurants", {
      method: "GET",
      headers: myHeaders,
    });
    const json = await response.json();
    if (json.verifiedUser === false) {
      localStorage.setItem("token", "");
      props.history.push("/");
      return;
    }
    setRestaurantsList(json.restaurantsList);
    setRestaurantsListLoaded(true);
  };

  useEffect(() => {
    props.fetchOffersAction();
    fetchRestaurantList();
  }, []);

  const slickSettings = {
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
  return (
    <>
      <HeaderComponent history={props.history} />
      <section className="explore-pane">
        {props.offersLoaded ? (
          <Slider className="image-container main-container" {...slickSettings}>
            {props.offers.map((image) => (
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
        {restaurantsListLoaded ? (
          <>
            <div className="rest-head main-container">
              <h1>{restaurantsList.length} restaurants</h1>
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
                {restaurantsList.map((obj) => (
                  <RestCard obj={obj} history={props.history} />
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
};

export default connect(mapStateTOProps, mapDispatchToProps)(RestaurantsPage);
