import React,{Component} from 'react';
import './CheckoutPage.css';
// import '../skeletonLoader.css';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const backendLink="https://sleepy-springs-24187.herokuapp.com";
// const backendLink="http://localhost:3000";

class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            ...this.props.ordersState,
            redMessage:'',
            greenMessage:'',
            orderplaced:false
        };
        // this.state=JSON.parse(`{"menuCategory":["Lunch Special","Chinese","North Indian","South Indian","Savouries","Sweets","Paratha"],"menu":[{"id":43194668,"name":"Gobi 65","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/xa82egyzbpjwjefq3hzo","price":170,"quantity":1,"subTotal":170},{"id":43194700,"name":"Gobi Manchurian Dry","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/hyzoc8b8xtpz6r3yn2iz","price":160,"quantity":1,"subTotal":160},{"id":43194656,"name":"Veg Fried Rice","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/xbgp8mfxrfqumcxdjqyr","price":160,"quantity":0,"subTotal":0},{"id":51081879,"name":"Madras Mixture 200 Grams","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/nr6qtxboi38lwt62madk","price":84,"quantity":0,"subTotal":0},{"id":43194565,"name":"Mothi Laddu","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/eqimah3gugyuopaq7efl","price":0,"quantity":0,"subTotal":0},{"id":43194579,"name":"Badusha","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/hhpyr4aghvlvrz5nt4gr","price":0,"quantity":0,"subTotal":0},{"id":43194583,"name":"Spl Mysore Pak","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/oexopt7ukejac5aa29sa","price":0,"quantity":0,"subTotal":0},{"id":43211351,"name":"Bombay Halwa","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/epy8q8yy3sjfv9cccw9d","price":0,"quantity":0,"subTotal":0},{"id":43194640,"name":"Chapathi With Kurma","img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_142/ypzistj1cg6ju6cprm8y","price":70,"quantity":0,"subTotal":0}],"totalPrice":330,"cartCount":2,"restaurantLoaded":true,"id":"72653","name":"A2B Veg","area":"North Tirupur","city":"Tirupur","imgLink":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ldx6jlcvwzhqpk4zrgtv","cuisines":"South Indian, North Indian","locality":"P.N Road","avgRating":"4.1","noOfRating":100,"duration":"37 MINS","costForTwo":200,"discount":"50% off up to ₹100 | Use code SWIGGYIT"}`);
        console.log(this.state)
        // console.log(this.props.ordersState)
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
    placeOrder= async ()=>{
        if(this.state.orderplaced)
            return;
        this.setState({greenMessage:"Please wait we are placing your order!!"})
        let orderMenu=[];
        this.state.menu.forEach(element => {
            if(element.quantity>0){
                orderMenu.push(element)
            }
        });
        // name,area,imgLink,timestamp
        let myHeaders = new Headers();
        myHeaders.append("x-access-token", localStorage.getItem("token"));
        var urlencoded = new URLSearchParams();
        urlencoded.append("restname", this.state.name);
        urlencoded.append("area", this.state.area);
        urlencoded.append("imglink", this.state.imgLink);
        urlencoded.append("ordersjson", JSON.stringify(orderMenu));
        urlencoded.append("totalprice", this.state.totalPrice);
        const response = await fetch(backendLink+"/api/placeorder",{
            method: 'POST',
            headers: myHeaders,
            body:urlencoded
        });
        const json = await response.json();
        if(json.verifiedUser===false){
            localStorage.setItem("token","");
            this.props.history.push("/");
            return;
        }
        console.log("json",json)
        if(json.orderplaced===true){
            this.setState({greenMessage:json.message,redMessage:"",orderplaced:true})
        }
    }
    render(){
        return(
                this.state.cartCount?
                <>
                    <HeaderComponent history={this.props.history}/>
                    <div className="checkout-wrapper">
                        <div className="checkout-container">
                            <div className="right-container">
                                <div className="cart-container">
                                    <div className="rest-preview-row">
                                        <div className="rest-img">
                                            <img src={this.state.imgLink} height="60px" width="60px"/>
                                        </div>
                                        <div className="rest-details">
                                            <div className="rest-name">{this.state.name}</div>
                                            <div className="rest-area">{this.state.area}</div>
                                        </div>
                                    </div>
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
                                        <div className="row2">33, 4th Cross Cut Road, Ration Office St, Tiruppur, Tamil Nadu 641602, India</div>
                                        <div className="row3">30 MINS</div>
                                    </div>
                                </div>
                                <div className="payment-container">
                                    <div className="payment-container-heading">
                                        Choose payment method
                                    </div>
                                    <div className="payment-container-row2">
                                        <div className="payment-button" onClick={this.placeOrder}>
                                            Cash On Delivery
                                        </div>
                                        <div className="payment-button" onClick={this.placeOrder}>
                                            Online Payment
                                        </div>
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center"}}>
                                        <div style={{marginTop:"15px",color:"#60b246",fontSize:"19px"}}>{this.state.greenMessage}</div>
                                        <div style={{marginTop:"15px",color:"red",fontSize:"19px"}}>{this.state.redMessage}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                this.state.id?
                    <div>
                        {this.props.history.push('/orders/'+this.state.id)}
                    </div>
                :
                    <div>
                        {this.props.history.push('/restaurants')}
                    </div>
        )
    }
}

export default CheckoutPage;