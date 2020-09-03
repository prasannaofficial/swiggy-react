import React,{Component} from 'react';
import './OrdersPage.css';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

import rest01 from '../../img/rest01.jpeg';
import rest02 from '../../img/rest02.jpeg';
import rest03 from '../../img/rest03.jpeg';
import rest04 from '../../img/rest04.jpeg';
import rest05 from '../../img/rest05.jpeg';
import rest06 from '../../img/rest06.jpeg';
import rest07 from '../../img/rest07.jpeg';
import rest08 from '../../img/rest08.jpeg';

const RestObj=[
    {
        id:'01',
        src:rest01,
        name:'Burger Hut',
        tagline:'Fast Food, Beverages',
        rating:'4.0',
        duration:'34 MINS',
        price:'₹ 200',
        offer:'30% off | Use BIRTHDAY'
    },
    {
        id:'02',
        src: rest02,
        name:'A2B Veg',
        tagline:'South Indian, North Indian',
        rating:'4.1',
        duration:'36 MINS',
        price:'₹ 200',
        offer:'50% off | Use BIRTHDAY'
    },
    {
        id:'03',
        src: rest03,
        name:'Dindigul Sri Alagappa Briyani',
        tagline:'Biryani, Chinese, North Indian, South Indian',
        rating:'4.3',
        duration:'34 MINS',
        price:'₹ 200',
        offer:'30% off | Use BIRTHDAY'
    },
    {
        id:'04',
        src: rest04,
        name:'Aththa Biriyani',
        tagline:'South Indian',
        rating:'3.9',
        duration:'150 MINS',
        price:'₹ 200',
        offer:'20% off | Use BIRTHDAY'
    },
    {
        id:'05',
        src: rest05,
        name:'7th Heaven',
        tagline:'Beverages, Continental, Desserts',
        rating:'4.0',
        duration:'42 MINS',
        price:'₹ 300',
        offer:'40% off | Use BIRTHDAY'
    },
    {
        id:'06',
        src: rest06,
        name:'Arafa Chicken Park',
        tagline:'South Indian, Chinese, Arabian, Tandoor',
        rating:'3.7',
        duration:'34 MINS',
        price:'₹ 200',
        offer:'40% off | Use BIRTHDAY'
    },
    {
        id:'07',
        src: rest07,
        name:'Sri Chettinadu Mess',
        tagline:'South Indian',
        rating:'3.3',
        duration:'38 MINS',
        price:'₹ 200',
        offer:'40% off | Use BIRTHDAY'
    },
    {
        id:'08',
        src: rest08,
        name:'Dindigul Asbas Briyani Centre',
        tagline:'South Indian',
        rating:'3.8',
        duration:'40 MINS',
        price:'₹ 1500',
        offer:'10% off | Use BIRTHDAY'
    }
]

class OrdersPage extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const id=this.props.match.params.id;
        return(
            <>
                <HeaderComponent/>
                {/* <h1>{this.props.match.params.id}</h1> */}
                {/* <HotelDirectory/> */}
                <div className="hotel-location-container">
                    Home&nbsp;&nbsp;/&nbsp;&nbsp;Tirupur&nbsp;&nbsp;/&nbsp;&nbsp;Central Tirupur&nbsp;&nbsp;/&nbsp;&nbsp;{RestObj[id].name}
                </div>
                <div className="hotel-intro-container">
                    <div className="hotel-intro">
                        <img 
                        // src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/kbstbwuchpaf0o2lllxp"
                        src={RestObj[id].src}
                        width="254"
                        height="165"
                        />
                        <div className="middle-section">
                            <div className="title">{RestObj[id].name}</div>
                            <div className="tag-line">{RestObj[id].tagline}</div>
                            <div className="address">Uthukuli main road, Central Tirupur</div>
                            <div className="info">
                                <div className="col1">
                                    <div className="line1" style={{display:"flex"}}><ion-icon name="star"></ion-icon>&nbsp;<span>{RestObj[id].rating}</span></div>
                                    <div className="line2">100+ Ratings</div>
                                </div>
                                <div className="col2">
                                    <div className="line1">{RestObj[id].duration}</div>
                                    <div className="line2">Delivery Time</div>
                                </div>
                                <div className="col3">
                                    <div className="line1">{RestObj[id].price}</div>
                                    <div className="line2">Cost for two</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="offer-heading">Offer</span>
                            <div className="right-section">
                                <div className="offers-li">
                                    <span><ion-icon name="gift"></ion-icon></span>
                                    <div>40% off up to ₹80 | Use code SWIGGYIT</div>
                                </div>
                                <div className="offers-li">
                                    <span><ion-icon name="gift"></ion-icon></span>
                                    <div>20% off up to ₹300 on orders above ₹600 | Use code PARTY</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hotel-food-items-container">
                    <div className="cart-container">
                        <h1>Cart</h1>
                        <p>2 items</p>
                        <div className="cartItem">
                            <div className="cartItem-col">
                                <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                            </div>
                            <div className="cartItem-name cartItem-col">Onion Rava Dosai</div>
                            <div className="addItem cartItem-col">
                                <div>-</div>
                                <div>1</div>
                                <div>+</div>
                            </div>
                            <div className="cartItem-col">
                                ₹110
                            </div>
                        </div>
                        <div className="cartItem">
                            <div className="cartItem-col">
                                <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                            </div>
                            <div className="cartItem-name cartItem-col">Ghee Roast</div>
                            <div className="addItem cartItem-col">
                                <div>-</div>
                                <div>1</div>
                                <div>+</div>
                            </div>
                            <div className="cartItem-col">
                                ₹110
                            </div>
                        </div>
                        <div className="checkout">
                            <div className="row1">
                                <div>Subtotal</div>
                                <div> ₹ 220</div>
                            </div>
                            <div className="row2">Extra charges may apply</div>
                            <div className="row3">CHECKOUT →</div>
                        </div>
                    </div>
                    <div className="menu-container">
                        <div className="menu-headings-container">
                            <ul>
                                <li className="active"><a href="#">Recommended</a></li>
                                <li><a href="#">Lunch Special</a></li>
                                <li><a href="#">Chinese</a></li>
                                <li><a href="#">Savouries</a></li>
                                <li><a href="#">Sweets</a></li>
                                <li><a href="#">Paratha</a></li>
                                <li><a href="#">South Indian</a></li>
                            </ul>
                        </div>
                        <div className="menu-items-container">
                            <div className="menu-type-container">
                                <h1>Recommended</h1>
                                <p>3 items</p>
                                <div className="menuItem">
                                    <div className="left">
                                        <div className="row1">
                                            <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                                            <ion-icon className="star-icon" name="star"></ion-icon>
                                            <span>Bestseller</span>
                                        </div>
                                        <div className="row2">Onion Rava Dosai</div>
                                        <div className="row3">₹110</div>
                                    </div>
                                    <div className="right">
                                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/kdpczaxknyuzltq8zr99"/>
                                        <div className="addItem">
                                            <div>-</div>
                                            <div>0</div>
                                            <div>+</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="menuItem">
                                    <div className="left">
                                        <div className="row1">
                                            <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                                            <ion-icon className="star-icon" name="star"></ion-icon>
                                            <span>Bestseller</span>
                                        </div>
                                        <div className="row2">Idly [2 Nos]</div>
                                        <div className="row3">₹45</div>
                                    </div>
                                    <div className="right">
                                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/ewuxg2kscljryspcvfgo"/>
                                        <div className="addItem">
                                            <div>-</div>
                                            <div>0</div>
                                            <div>+</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="menuItem">
                                    <div className="left">
                                        <div className="row1">
                                            <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                                            <ion-icon className="star-icon" name="star"></ion-icon>
                                            <span>Bestseller</span>
                                        </div>
                                        <div className="row2">Ghee Roast</div>
                                        <div className="row3">₹110</div>
                                    </div>
                                    <div className="right">
                                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/p2qe8rvn7yzy9gpwdfbm"/>
                                        <div className="addItem">
                                            <div>-</div>
                                            <div>0</div>
                                            <div>+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default OrdersPage;