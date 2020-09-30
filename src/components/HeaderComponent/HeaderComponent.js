import React from "react";
import "./HeaderComponent.css";
import logo from "../../img/s logo.png";

const HeaderComponent = ({ history }) => {
    return (
        <header className="header">
            <nav className="nav-bar navbar navbar-expand-lg navbar-light main-container">
                <a className="navbar-brand" href="/restaurants">
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
                            <a
                                className="nav-link home-menu"
                                href="/restaurants"
                            >
                                HOME
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link address">
                                4th Cross Cut Road, Ration Office St...
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav right-menu">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="search-outline"></ion-icon>
                                Search
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="help-buoy-outline"></ion-icon>
                                Help
                            </a>
                        </li>
                        <li
                            className="nav-item"
                            onClick={() => {
                                history.push("/myorders");
                                return true;
                            }}
                        >
                            <a className="nav-link" href="#">
                                <ion-icon name="fast-food-outline"></ion-icon>My
                                Orders
                            </a>
                        </li>
                        <li
                            className="nav-item"
                            onClick={() => {
                                localStorage.setItem("token", "");
                                history.push("/");
                                return true;
                            }}
                        >
                            <a className="nav-link" href="#">
                                <ion-icon name="person-outline"></ion-icon>
                                Logout
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="cart-outline"></ion-icon>Cart
                            </a>
                        </li>
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                href="#"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    {
                                        const prefersDarkScheme = window.matchMedia(
                                            "(prefers-color-scheme: dark)"
                                        );
                                        if (prefersDarkScheme.matches) {
                                            document.body.classList.toggle(
                                                "light-mode"
                                            );
                                            var theme = document.body.classList.contains(
                                                "light-mode"
                                            )
                                                ? "light"
                                                : "dark";
                                        } else {
                                            document.body.classList.toggle(
                                                "dark-mode"
                                            );
                                            var theme = document.body.classList.contains(
                                                "dark-mode"
                                            )
                                                ? "dark"
                                                : "light";
                                        }
                                        localStorage.setItem("theme", theme);
                                    }
                                }}
                            >
                                <ion-icon
                                    name="moon"
                                    class="btn-toggle"
                                ></ion-icon>
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
