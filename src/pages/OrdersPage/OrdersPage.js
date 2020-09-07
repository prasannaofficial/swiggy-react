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

import quickView01 from '../../img/quickView01.jpeg';
import quickView02 from '../../img/quickView02.jpeg';
import quickView03 from '../../img/quickView03.jpeg';
import quickView04 from '../../img/quickView04.jpeg';
import quickView05 from '../../img/quickView05.jpeg';
import quickView06 from '../../img/quickView06.jpeg';

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

const initialState={
    menu:[
        {
            id:1,
            name:"Onion Rava Dosai",
            img:quickView01,
            price:110,
            quantity:0,
            subTotal:0
        },
        {
            id:2,
            name:"Ghee Roast",
            img:quickView02,
            price:110,
            quantity:0,
            subTotal:0
        },
        {
            id:3,
            name:"Idly [2 Nos]",
            img:quickView03,
            price:45,
            quantity:0,
            subTotal:0
        },
        {
            id:4,
            name:"Mini Idly",
            img:quickView04,
            price:80,
            quantity:0,
            subTotal:0
        },
        {
            id:5,
            name:"Onion Uttapam",
            img:quickView05,
            price:120,
            quantity:0,
            subTotal:0
        },
        {
            id:6,
            name:"Poori [2 Nos]",
            img:quickView06,
            price:70,
            quantity:0,
            subTotal:0
        }
    ],
    totalPrice:0,
    cartCount:0
};

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state=initialState;
    }
    decrement=(id)=>{
        let menu=[...this.state.menu];
        let cartCount=this.state.cartCount;
        let totalPrice=0;
        menu.forEach(element => {
            if(element.id===id){
                if(element.quantity){
                    if(element.quantity===1){
                        cartCount--;
                    }
                    element.quantity--;
                }
                element.subTotal=element.quantity*element.price;
                totalPrice+=element.subTotal;
            }
        });
        this.setState({menu,cartCount,totalPrice})
        // console.log(id);
    }
    increment=(id)=>{
        let menu=[...this.state.menu];
        let cartCount=this.state.cartCount;
        let totalPrice=0;
        menu.forEach(element => {
            if(element.id===id){
                if(!element.quantity){
                    cartCount++;
                }
                element.quantity++;
                element.subTotal=element.quantity*element.price;
                totalPrice+=element.subTotal;
            }
        });
        this.setState({menu,cartCount,totalPrice})
        // console.log(id);
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
                    <>
                        { 
                            this.state.cartCount>0?
                            (
                                <div className="cart-container">
                                    <h1>Cart</h1>
                                    <p>{this.state.cartCount} items</p>
                                    {
                                        this.state.menu.map(menuItem=>{
                                            if(menuItem.quantity>0){
                                                return <div className="cartItem">
                                                            <div className="cartItem-col">
                                                                <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                                                            </div>
                                                            <div className="cartItem-name cartItem-col">{menuItem.name}</div>
                                                            <div className="addItem cartItem-col">
                                                                <div onClick={()=>this.decrement(menuItem.id)}>-</div>
                                                                <div>{menuItem.quantity}</div>
                                                                <div onClick={()=>this.increment(menuItem.id)}>+</div>
                                                            </div>
                                                            <div className="cartItem-col">
                                                                ₹{menuItem.subTotal}
                                                            </div>
                                                        </div>
                                            }
                                        })
                                    }
                                    <div className="checkout">
                                        <div className="row1">
                                            <div>Subtotal</div>
                                            <div> ₹ {this.state.totalPrice}</div>
                                        </div>
                                        <div className="row2">Extra charges may apply</div>
                                        <div className="row3">CHECKOUT →</div>
                                    </div>
                                </div>
                            ):
                            <div className="cart-container empty-cart">
                                <h1>Cart Empty</h1>
                                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2"/>
                                <div>
                                    Good food is always cooking! Go ahead, order some yummy items from the menu.
                                </div>
                            </div>
                        }
                    </>
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
                                {
                                    this.state.menu.map(menuItem=>{
                                        return <div className="menuItem">
                                            <div className="left">
                                                <div className="row1">
                                                    <ion-icon className="veg-icon" name="heart-circle-outline"></ion-icon>
                                                    <ion-icon className="star-icon" name="star"></ion-icon>
                                                    <span>Bestseller</span>
                                                </div>
                                                <div className="row2">{menuItem.name}</div>
                                                <div className="row3">₹{menuItem.price}</div>
                                            </div>
                                            <div className="right">
                                                <img src={menuItem.img}/>
                                                <div className="addItem">
                                                    <div onClick={()=>this.decrement(menuItem.id)}>-</div>
                                                    <div>{menuItem.quantity}</div>
                                                    <div onClick={()=>this.increment(menuItem.id)}>+</div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                {/* <div className="menuItem">
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default OrdersPage;