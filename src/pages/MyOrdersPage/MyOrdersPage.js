import React,{Component} from 'react';
import './MyOrdersPage.css';
import '../skeletonLoader.css';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

import axios from 'axios';
import ReactPaginate from 'react-paginate';


// const backendLink="https://sleepy-springs-24187.herokuapp.com";
const backendLink="http://localhost:3000";

class MyOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            ordersLoaded:false,
            myOrders:[],
            limit: 5,
            queryString:'',
            offset: 0,
            sortString:"asce",
            currentPage: 0
        }
    }
    componentDidMount(){
        this.fetchMyOrders()
    }
    fetchMyOrders = async () => {
        let myHeaders = new Headers();
        myHeaders.append("x-access-token", localStorage.getItem("token"));
        const response = await fetch(`${backendLink}/api/ordershistory?q=${this.state.queryString}&limit=${this.state.limit}&offset=${this.state.offset}&sort=${this.state.sortString}`,{
            method: 'GET',
            headers: myHeaders
        });
        const json = await response.json();
        if(json.verifiedUser===false){
            localStorage.setItem("token","");
            this.props.history.push("/");
            return;
        }
        console.log("arr",json.arr)
        let pageCount=Math.ceil(json.length / this.state.limit)
        this.setState({ordersLoaded:true,myOrders:json.arr,pageCount:pageCount})
    }
    // receivedData() {
    //     axios
    //         .get(`https://jsonplaceholder.typicode.com/photos`)
    //         .then(res => {

    //             const data = res.data;
    //             const slice = data.slice(this.state.offset, this.state.offset + this.state.limit)
    //             const postData = slice.map(pd => <React.Fragment>
    //                 <p>{pd.title}</p>
    //                 <img src={pd.thumbnailUrl} alt=""/>
    //             </React.Fragment>)

    //             this.setState({
    //                 pageCount: Math.ceil(data.length / this.state.limit),
                   
    //                 postData
    //             })
    //         });
    // }
    sortNewestHandler=()=>{
        this.setState({
            queryString:'',
            offset: 0,
            sortString:"new",
            currentPage: 0
        }, () => {
            this.fetchMyOrders()
        })
    }
    sortOldestHandler=()=>{
        this.setState({
            queryString:'',
            offset: 0,
            sortString:"old",
            currentPage: 0
        }, () => {
            this.fetchMyOrders()
        })
    }
    sortAsceHandler=()=>{
        this.setState({
            queryString:'',
            offset: 0,
            sortString:"asce",
            currentPage: 0
        }, () => {
            this.fetchMyOrders()
        })
    }
    sortDescHandler=()=>{
        this.setState({
            queryString:'',
            offset: 0,
            sortString:"desc",
            currentPage: 0
        }, () => {
            this.fetchMyOrders()
        })
    }
    searchHandler=()=>{
        this.setState({
            offset: 0,
            sortString:"asce",
            currentPage: 0
        }, () => {
            this.fetchMyOrders()
        })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.limit;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.fetchMyOrders()
        });

    };
    render(){
        return(
            <>
            <HeaderComponent history={this.props.history}/>
            {
                this.state.ordersLoaded?
                    <div className="myorders-wrapper">
                        <div className="myorders-container">
                            <div className="head-section">
                                <div>
                                    <h1>Past Orders</h1>
                                </div>
                                <div>
                                    <ul>
                                        <a href="#" onClick={this.sortNewestHandler}><li>Newest</li></a>
                                        <a href="#" onClick={this.sortOldestHandler}><li>Oldest</li></a>
                                        <a href="#" onClick={this.sortAsceHandler}><li>Sort A-Z</li></a>
                                        <a href="#" onClick={this.sortDescHandler}><li>Sort Z-A</li></a>
                                        <li><input type="text" placeholder="Search..." value={this.state.queryString} onChange={
                                            (event)=>{
                                                this.setState({queryString:event.target.value})
                                                this.searchHandler()
                                            }
                                        }/></li>
                                    </ul>
                                </div>
                            </div>
                            {
                                this.state.myOrders.map(el=>{
                                    let itemsName=[];
                                    el.orders.forEach(element => {
                                        itemsName.push(element.name+" x "+element.quantity)
                                    });
                                    let date=new Date(el.date);
                                    return <div className="pastorder-container">
                                                <div className="top">
                                                    <div className="left-img">
                                                        <img height="100px" width="150px" src={el.restimg}/>
                                                    </div>
                                                    <div className="right-detail">
                                                        <div className="restname">{el.restname}</div>
                                                        <div className="restarea">{el.restarea}</div>
                                                        <div className="order-details"><span>ORDER #{el["_id"].substring(10)}</span> | <span>{date.toDateString()}</span>, <span>{date.toLocaleTimeString()}</span></div>
                                                        <div className="view-details-btn">VIEW DETAILS</div>
                                                    </div>
                                                </div>
                                                <div className="bottom">
                                                    <div className="row1">
                                                        <div>{itemsName.join(", ")}</div>
                                                        <div>Total Paid: ₹{el.totalprice}</div>
                                                    </div>
                                                    <div className="row2">
                                                        <a>REORDER</a>
                                                        <a>HELP</a>
                                                    </div>
                                                </div>
                                            </div>
                                })
                            }
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <ReactPaginate
                                    previousLabel={"Prev"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={3}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                :   <section className="explore-pane">
                        <div className="loader-explore-pane">
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <img className="spinner-icon" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"/>
                            </div>
                            <div className="loader-text">Looking for your orders ...</div>
                        </div>
                    </section>
            }
            </>
        )
    }
}

export default MyOrdersPage;