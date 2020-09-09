import React,{Component} from 'react';
import './OrdersPage.css';
import '../skeletonLoader.css';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const backendLink="https://sleepy-springs-24187.herokuapp.com";
// const backendLink="http://localhost:3000";

const initialState={
    menuCategory:[],
    menu:[],
    totalPrice:0,
    cartCount:0,
    restaurantLoaded:false
};

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state=initialState;
    }
    componentDidMount() {
        this.fetchRestaurantDetails(this.props.match.params.id);
    }
    fetchRestaurantDetails = async (restId) => {
        const response = await fetch(backendLink+"/api/restaurant/"+restId);
        const json = await response.json();
        let {id,name,area,city,imgLink,cuisines,locality,avgRating,noOfRating,duration,costForTwo,discount,menuCategory,recommended} = json; 
        let menu=recommended.map(el=>{
            let temp={
                id:el.id,
                name:el.name,
                img:el.imgLink,
                price:el.price,
                quantity:0,
                subTotal:0
            }
            return temp;
        })
        this.setState({id,name,area,city,imgLink,cuisines,locality,avgRating,noOfRating,duration,costForTwo,discount,menuCategory,menu,restaurantLoaded:true})
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
            }
            totalPrice+=element.subTotal;
        });
        this.setState({menu,cartCount,totalPrice})
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
            }
            totalPrice+=element.subTotal;
        });
        this.setState({menu,cartCount,totalPrice})
    }
    render(){
        const id=this.props.match.params.id;
        return(
            <>
                <HeaderComponent/>
                {
                    this.state.restaurantLoaded
                    ?   <>
                            <div className="hotel-location-wrapper">
                                <div className="hotel-location-container">
                                    Home&nbsp;&nbsp;/&nbsp;&nbsp;{this.state.city}&nbsp;&nbsp;/&nbsp;&nbsp;{this.state.area}&nbsp;&nbsp;/&nbsp;&nbsp;{this.state.name}
                                </div>
                            </div>
                            <div className="hotel-intro-container">
                                <div className="hotel-intro">
                                    <img src={this.state.imgLink} width="254" height="165"/>
                                    <div className="middle-section">
                                        <div className="title">{this.state.name}</div>
                                        <div className="tag-line">{this.state.tagline}</div>
                                        <div className="address">{this.state.locality}, {this.state.area}</div>
                                        <div className="info">
                                            <div className="col1">
                                                <div className="line1" style={{display:"flex"}}><ion-icon name="star"></ion-icon>&nbsp;<span>{this.state.avgRating}</span></div>
                                                <div className="line2">{this.state.noOfRating}+ Ratings</div>
                                            </div>
                                            <div className="col2">
                                                <div className="line1">{this.state.duration}</div>
                                                <div className="line2">Delivery Time</div>
                                            </div>
                                            <div className="col3">
                                                <div className="line1">₹ {this.state.costForTwo}</div>
                                                <div className="line2">Cost for two</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="offer-heading">Offer</span>
                                        <div className="right-section">
                                            <div className="offers-li">
                                                <span><ion-icon name="gift"></ion-icon></span>
                                                <div>{this.state.discount}</div>
                                            </div>
                                            <div className="offers-li">
                                                <span><ion-icon name="gift"></ion-icon></span>
                                                <div>20% off up to ₹300 on orders above ₹600 | Use code PARTY</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hotel-food-items-wrapper">
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
                                                {this.state.menuCategory.map(el=><li><a href="#">{el}</a></li>)}
                                                {/* <li><a href="#">Lunch Special</a></li>
                                                <li><a href="#">Chinese</a></li>
                                                <li><a href="#">Savouries</a></li>
                                                <li><a href="#">Sweets</a></li>
                                                <li><a href="#">Paratha</a></li>
                                                <li><a href="#">South Indian</a></li> */}
                                            </ul>
                                        </div>
                                        <div className="menu-items-container">
                                            <div className="menu-type-container">
                                                <h1>Recommended</h1>
                                                <p>{this.state.menu.length} items</p>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </>
                    :   <>
                            <div className="loader-explore-pane-container">
                                <div className="loader-explore-pane">
                                    <div className="spinner-container">
                                        <div className="spinner"></div>
                                        <img className="spinner-icon" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"/>
                                    </div>
                                    <div className="loader-text">Looking for great food items in this restaurant ...</div>
                                </div>
                            </div>
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
                        </>
                }
            </>
        );
    };
}

export default OrdersPage;