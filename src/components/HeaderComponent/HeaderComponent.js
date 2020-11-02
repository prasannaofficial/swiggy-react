import React from "react";
import "./HeaderComponent.css";
import logo from "../../img/s logo.png";

import { requestFirebaseNotificationPermission } from "../../firebaseInit";

const HeaderComponent = ({ history, role }) => {
  let home, isUser;
  if (role === "admin") {
    home = "/admin";
  } else {
    home = "/restaurants";
    isUser = true;
  }
  return (
    <header className="header">
      <nav className="nav-bar navbar navbar-expand-lg navbar-light main-container">
        <a className="navbar-brand" href={home}>
          <img src={logo} width="34" height="49" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse full-menu"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav mr-auto left-menu">
            <li className="nav-item">
              <a className="nav-link home-menu" href={home}>
                HOME
              </a>
            </li>
            {/* {isUser ? (
              <li className="nav-item">
                <a className="nav-link address">
                  4th Cross Cut Road, Ration Office St...
                </a>
              </li>
            ) : (
              <></>
            )} */}
          </ul>
          <ul className="navbar-nav right-menu">
            {isUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link">
                    <ion-icon name="search-outline"></ion-icon>
                    Search
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    requestFirebaseNotificationPermission()
                      .then((firebaseToken) => {
                        console.log(firebaseToken);
                        history.push("/chat");
                      })
                      .catch((err) => {
                        return err;
                      });
                    return true;
                  }}
                >
                  <a className="nav-link">
                    <ion-icon name="help-buoy-outline"></ion-icon>Chat
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    history.push("/myorders");
                    return true;
                  }}
                >
                  <a className="nav-link">
                    <ion-icon name="fast-food-outline"></ion-icon>My Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <ion-icon name="cart-outline"></ion-icon>Cart
                  </a>
                </li>
              </>
            ) : (
              <>
                <li
                  className="nav-item"
                  onClick={() => {
                    requestFirebaseNotificationPermission()
                      .then((firebaseToken) => {
                        console.log(firebaseToken);
                        history.push("/adminchat");
                      })
                      .catch((err) => {
                        return err;
                      });
                    return true;
                  }}
                >
                  <a className="nav-link">
                    <ion-icon name="help-buoy-outline"></ion-icon>Chat
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    history.push("/admin");
                    return true;
                  }}
                >
                  <a className="nav-link">
                    <ion-icon name="fast-food-outline"></ion-icon>Orders
                  </a>
                </li>
              </>
            )}
            <li
              className="nav-item"
              onClick={() => {
                localStorage.setItem("token", "");
                history.push("/");
                return true;
              }}
            >
              <a className="nav-link">
                <ion-icon name="person-outline"></ion-icon>
                Logout
              </a>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() => {
                  {
                    const prefersDarkScheme = window.matchMedia(
                      "(prefers-color-scheme: dark)"
                    );
                    if (prefersDarkScheme.matches) {
                      document.body.classList.toggle("light-mode");
                      var theme = document.body.classList.contains("light-mode")
                        ? "light"
                        : "dark";
                    } else {
                      document.body.classList.toggle("dark-mode");
                      var theme = document.body.classList.contains("dark-mode")
                        ? "dark"
                        : "light";
                    }
                    localStorage.setItem("theme", theme);
                  }
                }}
              >
                <ion-icon name="moon" class="btn-toggle"></ion-icon>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
