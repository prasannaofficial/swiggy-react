import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import "./CheckoutPage.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import CartItemComponent from "../../components/CartItemComponent";
import { backendLink } from "../../constants";

const mapStateTOProps = (state) => {
  return {
    myOrders: state.setMenuReducer.myOrders,
  };
};

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.myOrders,
      redMessage: "",
      greenMessage: "",
      orderplaced: false,
      isPlacing: false,
    };
  }
  decrement = (id) => {
    let menu = [...this.state.menu];
    let cartCount = this.state.cartCount;
    let totalPrice = 0;
    menu.forEach((element) => {
      if (element.id === id) {
        if (element.quantity) {
          if (element.quantity === 1) {
            cartCount--;
          }
          element.quantity--;
        }
        element.subTotal = element.quantity * element.price;
      }
      totalPrice += element.subTotal;
    });
    this.setState({ menu, cartCount, totalPrice });
  };
  increment = (id) => {
    let menu = [...this.state.menu];
    let cartCount = this.state.cartCount;
    let totalPrice = 0;
    menu.forEach((element) => {
      if (element.id === id) {
        if (!element.quantity) {
          cartCount++;
        }
        element.quantity++;
        element.subTotal = element.quantity * element.price;
      }
      totalPrice += element.subTotal;
    });
    this.setState({ menu, cartCount, totalPrice });
  };
  placeOrder = async () => {
    if (this.state.isPlacing) return;
    else {
      this.setState({ isPlacing: true });
    }
    this.setState({
      greenMessage: "Please wait we are placing your order!!",
    });
    let orderMenu = [];
    this.state.menu.forEach((element) => {
      if (element.quantity > 0) {
        orderMenu.push(element);
      }
    });
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    var urlencoded = new URLSearchParams();
    urlencoded.append("restname", this.state.restDetails.name);
    urlencoded.append("area", this.state.restDetails.area);
    urlencoded.append("imglink", this.state.restDetails.imgLink);
    urlencoded.append("ordersjson", JSON.stringify(orderMenu));
    urlencoded.append("totalprice", this.state.totalPrice);
    const response = await fetch(backendLink + "/api/placeorder", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    });
    const json = await response.json();
    if (json.verifiedUser === false) {
      localStorage.setItem("token", "");
      this.props.history.push("/");
      return;
    }
    if (json.orderplaced === true) {
      this.setState({
        greenMessage: json.message,
        redMessage: "",
        orderplaced: true,
        isPlacing: false,
      });
    }
  };
  placeOrderOnline = async (e) => {
    e.preventDefault();
    if (this.state.isPlacing) return;
    else {
      this.setState({ isPlacing: true });
    }
    this.setState({
      greenMessage: "Please wait we are placing your order!!",
      redMessage: "",
    });
    let orderMenu = [];
    this.state.menu.forEach((element) => {
      if (element.quantity > 0) {
        orderMenu.push(element);
      }
    });
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    var urlencoded = new URLSearchParams();
    urlencoded.append("restname", this.state.restDetails.name);
    urlencoded.append("area", this.state.restDetails.area);
    urlencoded.append("imglink", this.state.restDetails.imgLink);
    urlencoded.append("ordersjson", JSON.stringify(orderMenu));
    urlencoded.append("totalprice", this.state.totalPrice);
    const response = await fetch(backendLink + "/api/payment/order", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    });
    const data = await response.json();
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Swiggy",
      description: "Order your food",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = backendLink + "/api/payment/capture/" + paymentId;
          const captureResponse = await Axios.post(url, {
            totalprice: this.state.totalPrice,
            swiggy_order_id: data.data._id,
          });
          this.setState({
            greenMessage: "Order Placed Successfully!!",
            redMessage: "",
            orderplaced: true,
            isPlacing: false,
          });
        } catch (err) {
          console.log("Catch error", err);
        }
      },
      theme: {
        color: "#686CFD",
      },
      modal: {
        ondismiss: () => {
          this.setState({
            greenMessage: "",
            redMessage: "Payment canceled. Please try again.",
            orderplaced: false,
            isPlacing: false,
          });
        },
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  render() {
    return this.state.cartCount ? (
      <>
        <HeaderComponent history={this.props.history} />
        <div className="checkout-wrapper">
          <div className="checkout-container">
            <div className="right-container">
              <div className="cart-container">
                <div className="rest-preview-row">
                  <div className="rest-img">
                    <img
                      src={this.state.restDetails.imgLink}
                      height="60px"
                      width="60px"
                    />
                  </div>
                  <div className="rest-details">
                    <div className="rest-name">
                      {this.state.restDetails.name}
                    </div>
                    <div className="rest-area">
                      {this.state.restDetails.area}
                    </div>
                  </div>
                </div>
                {this.state.menu.map((menuItem) => {
                  if (menuItem.quantity > 0) {
                    return (
                      <CartItemComponent
                        menuItem={menuItem}
                        increment={this.increment}
                        decrement={this.decrement}
                      />
                    );
                  }
                })}
                <div className="checkoutpage-checkout">
                  <div className="row1">
                    <div>Subtotal</div>
                    <div> ₹ {this.state.totalPrice}</div>
                  </div>
                  <div className="row2">Extra charges may apply</div>
                  <div className="row3">
                    <div>To Pay</div>
                    <div> ₹ {this.state.totalPrice}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left-container">
              <div className="address-container">
                <div className="address-container-heading">
                  Delivery Address
                </div>
                <div className="address-container-row2">
                  <div className="row1">Home</div>
                  <div className="row2">
                    33, 4th Cross Cut Road, Ration Office St, Tiruppur, Tamil
                    Nadu 641602, India
                  </div>
                  <div className="row3">30 MINS</div>
                </div>
              </div>
              <div className="payment-container">
                <div className="payment-container-heading">
                  Choose payment method
                </div>
                {!this.state.orderplaced ? (
                  <div className="payment-container-row2">
                    <div className="payment-button" onClick={this.placeOrder}>
                      Cash On Delivery
                    </div>
                    <div
                      className="payment-button"
                      onClick={this.placeOrderOnline}
                    >
                      Online Payment
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      marginTop: "15px",
                      color: "#60b246",
                      fontSize: "19px",
                    }}
                  >
                    {this.state.greenMessage}
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      color: "red",
                      fontSize: "19px",
                    }}
                  >
                    {this.state.redMessage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : this.state.id ? (
      <div>{this.props.history.push("/orders/" + this.state.id)}</div>
    ) : (
      <div>{this.props.history.push("/restaurants")}</div>
    );
  }
}

export default connect(mapStateTOProps, null)(CheckoutPage);
