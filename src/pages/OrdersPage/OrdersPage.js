import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import "./OrdersPage.css";
import "../skeletonLoader.css";

import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { setMenuAction } from "../../redux/actions";
import CartItemComponent from "../../components/CartItemComponent";
import MenuItemComponent from "../../components/MenuItemComponent";
import { backendLink } from "../../constants";

const mapDispatchToProps = (dispath) => {
  return {
    setMenuAction: (menu) => dispath(setMenuAction(menu)),
  };
};

const OrdersPage = (props) => {
  const [restDetails, setRestDetails] = useState({});
  const [menuCategory, setMenuCategory] = useState([]);
  const [menu, setMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [restaurantLoaded, setRestaurantLoaded] = useState(false);
  const fetchRestaurantDetails = async (restId) => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    const response = await fetch(backendLink + "/api/restaurant/" + restId, {
      method: "GET",
      headers: myHeaders,
    });
    const json = await response.json();
    if (json.verifiedUser === false) {
      localStorage.setItem("token", "");
      props.history.push("/");
      return;
    }
    let {
      id,
      name,
      area,
      city,
      imgLink,
      cuisines,
      locality,
      avgRating,
      noOfRating,
      duration,
      costForTwo,
      discount,
      menuCategory,
      recommended,
    } = json;
    let menu = recommended.map((el) => {
      let temp = {
        id: el.id,
        name: el.name,
        img: el.imgLink,
        price: el.price,
        quantity: 0,
        subTotal: 0,
      };
      return temp;
    });
    setMenu(menu);
    setMenuCategory(menuCategory);
    setRestaurantLoaded(true);
    setRestDetails({
      id,
      name,
      area,
      city,
      imgLink,
      cuisines,
      locality,
      avgRating,
      noOfRating,
      duration,
      costForTwo,
      discount,
    });
  };
  const decrement = (id) => {
    let newMenu = [...menu];
    let newCartCount = cartCount;
    let totalPrice = 0;
    newMenu.forEach((element) => {
      if (element.id === id) {
        if (element.quantity) {
          if (element.quantity === 1) {
            newCartCount--;
          }
          element.quantity--;
        }
        element.subTotal = element.quantity * element.price;
      }
      totalPrice += element.subTotal;
    });
    setMenu(newMenu);
    setCartCount(newCartCount);
    setTotalPrice(totalPrice);
  };
  const increment = (id) => {
    let newMenu = [...menu];
    let newCartCount = cartCount;
    let totalPrice = 0;
    newMenu.forEach((element) => {
      if (element.id === id) {
        if (!element.quantity) {
          newCartCount++;
        }
        element.quantity++;
        element.subTotal = element.quantity * element.price;
      }
      totalPrice += element.subTotal;
    });
    setMenu(newMenu);
    setCartCount(newCartCount);
    setTotalPrice(totalPrice);
  };
  useEffect(() => {
    fetchRestaurantDetails(props.match.params.id);
  }, []);
  return (
    <>
      <HeaderComponent history={props.history} />
      {restaurantLoaded ? (
        <>
          <div className="hotel-location-wrapper">
            <div className="hotel-location-container">
              Home&nbsp;&nbsp;/&nbsp;&nbsp;{restDetails.city}
              &nbsp;&nbsp;/&nbsp;&nbsp;{restDetails.area}
              &nbsp;&nbsp;/&nbsp;&nbsp;{restDetails.name}
            </div>
          </div>
          <div className="hotel-intro-container">
            <div className="hotel-intro">
              <img src={restDetails.imgLink} width="254" height="165" />
              <div className="middle-section">
                <div className="title">{restDetails.name}</div>
                <div className="tag-line">{restDetails.cuisines}</div>
                <div className="address">
                  {restDetails.locality}, {restDetails.area}
                </div>
                <div className="info">
                  <div className="col1">
                    <div className="line1" style={{ display: "flex" }}>
                      <ion-icon name="star"></ion-icon>
                      &nbsp;
                      <span>{restDetails.avgRating}</span>
                    </div>
                    <div className="line2">
                      {restDetails.noOfRating}+ Ratings
                    </div>
                  </div>
                  <div className="col2">
                    <div className="line1">{restDetails.duration}</div>
                    <div className="line2">Delivery Time</div>
                  </div>
                  <div className="col3">
                    <div className="line1">₹ {restDetails.costForTwo}</div>
                    <div className="line2">Cost for two</div>
                  </div>
                </div>
              </div>
              <div>
                <span className="offer-heading">Offer</span>
                <div className="right-section">
                  <div className="offers-li">
                    <span>
                      <ion-icon name="gift"></ion-icon>
                    </span>
                    <div>{restDetails.discount}</div>
                  </div>
                  <div className="offers-li">
                    <span>
                      <ion-icon name="gift"></ion-icon>
                    </span>
                    <div>
                      20% off up to ₹300 on orders above ₹600 | Use code PARTY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hotel-food-items-wrapper">
            <div className="hotel-food-items-container">
              <>
                {cartCount > 0 ? (
                  <div className="cart-container">
                    <h1>Cart</h1>
                    <p>{cartCount} items</p>
                    {menu.map((menuItem) => {
                      if (menuItem.quantity > 0) {
                        return (
                          <CartItemComponent
                            menuItem={menuItem}
                            increment={increment}
                            decrement={decrement}
                          />
                        );
                      }
                    })}
                    <div className="checkout">
                      <div className="row1">
                        <div>Subtotal</div>
                        <div> ₹ {totalPrice}</div>
                      </div>
                      <div className="row2">Extra charges may apply</div>
                      <div
                        className="row3"
                        onClick={() => {
                          props.setMenuAction({
                            restDetails,
                            menuCategory,
                            menu,
                            totalPrice,
                            cartCount,
                            restaurantLoaded,
                          });
                          props.history.push("/checkout");
                        }}
                      >
                        CHECKOUT →
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="cart-container empty-cart">
                    <h1>Cart Empty</h1>
                    <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2" />
                    <div>
                      Good food is always cooking! Go ahead, order some yummy
                      items from the menu.
                    </div>
                  </div>
                )}
              </>
              <div className="menu-container">
                <div className="menu-headings-container">
                  <ul>
                    <li className="active">
                      <a href="#">Recommended</a>
                    </li>
                    {menuCategory.map((el) => (
                      <li>
                        <a href="#">{el}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="menu-items-container">
                  <div className="menu-type-container">
                    <h1>Recommended</h1>
                    <p>{menu.length} items</p>
                    {menu.map((menuItem) => {
                      return (
                        <MenuItemComponent
                          menuItem={menuItem}
                          increment={increment}
                          decrement={decrement}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loader-explore-pane-container">
            <div className="loader-explore-pane">
              <div className="spinner-container">
                <div className="spinner"></div>
                <img
                  className="spinner-icon"
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                />
              </div>
              <div className="loader-text">
                Looking for great food items in this restaurant ...
              </div>
            </div>
          </div>
          <div className="loader-restaurants-pane-container">
            <div className="loader-restaurants-pane main-container">
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
          </div>
        </>
      )}
    </>
  );
};

export default connect(null, mapDispatchToProps)(OrdersPage);
