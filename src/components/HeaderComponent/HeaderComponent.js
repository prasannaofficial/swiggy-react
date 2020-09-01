import React from 'react';
import './HeaderComponent.css';
import logo from '../../img/s logo.png';

const HeaderComponent = () => {
    return(
        <header className="header">
            <nav className="nav-bar navbar navbar-expand-lg navbar-light main-container">
                <a className="navbar-brand" href="#">
                    <img src={logo} width='34' height='49' />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse full-menu" id="collapsibleNavbar">
                    <ul className="navbar-nav mr-auto left-menu">
                        <li className="nav-item">
                            <a className="nav-link home-menu" href="#">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link address">4th Cross Cut Road, Ration Office St...</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav right-menu">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="search-outline"></ion-icon>Search
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="gift-outline"></ion-icon>Offers
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="help-buoy-outline"></ion-icon>Help
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="person-outline"></ion-icon>Prasanna
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="cart-outline"></ion-icon>Cart
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <ion-icon name="moon" className="btn-toggle"></ion-icon>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponent;