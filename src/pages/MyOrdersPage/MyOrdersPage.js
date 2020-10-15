import React, { Component } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import ReactPaginate from "react-paginate";
import "./MyOrdersPage.css";
import "../skeletonLoader.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import MyOrderComponent from "../../components/MyOrderComponent";
import { backendLink } from "../../constants";

class MyOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersLoaded: false,
      myOrders: [],
      limit: 5,
      queryString: "",
      offset: 0,
      sortString: "asce",
      currentPage: 0,
      showSpinner: false,
    };
  }
  componentDidMount() {
    this.fetchMyOrders();
  }
  fetchMyOrders = async () => {
    this.setState({ showSpinner: true });
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    const response = await fetch(
      `${backendLink}/api${
        this.props.role === "admin" ? "/admin" : ""
      }/ordershistory?q=${this.state.queryString}&limit=${
        this.state.limit
      }&offset=${this.state.offset}&sort=${this.state.sortString}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const json = await response.json();
    if (json.verifiedUser === false) {
      localStorage.setItem("token", "");
      this.props.history.push("/");
      return;
    }
    let pageCount = Math.ceil(json.length / this.state.limit);
    this.setState({
      ordersLoaded: true,
      myOrders: json.arr,
      pageCount: pageCount,
      showSpinner: false,
    });
  };
  debouncedFetchMyOrders = AwesomeDebouncePromise(this.fetchMyOrders, 1200);
  sortNewestHandler = () => {
    this.setState(
      {
        queryString: "",
        offset: 0,
        sortString: "new",
        currentPage: 0,
      },
      () => {
        this.fetchMyOrders();
      }
    );
  };
  sortOldestHandler = () => {
    this.setState(
      {
        queryString: "",
        offset: 0,
        sortString: "old",
        currentPage: 0,
      },
      () => {
        this.fetchMyOrders();
      }
    );
  };
  sortAsceHandler = () => {
    this.setState(
      {
        queryString: "",
        offset: 0,
        sortString: "asce",
        currentPage: 0,
      },
      () => {
        this.fetchMyOrders();
      }
    );
  };
  sortDescHandler = () => {
    this.setState(
      {
        queryString: "",
        offset: 0,
        sortString: "desc",
        currentPage: 0,
      },
      () => {
        this.fetchMyOrders();
      }
    );
  };
  searchHandler = () => {
    this.setState(
      {
        offset: 0,
        sortString: "asce",
        currentPage: 0,
      },
      async () => {
        await this.debouncedFetchMyOrders();
      }
    );
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.limit;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.fetchMyOrders();
      }
    );
  };
  render() {
    return (
      <>
        <HeaderComponent history={this.props.history} role={this.props.role} />
        {this.state.ordersLoaded ? (
          <div className="myorders-wrapper">
            <div className="myorders-container">
              <div className="head-section">
                <div>
                  <h1>Past Orders</h1>
                </div>
                <div>
                  <ul>
                    <a href="#" onClick={this.sortNewestHandler}>
                      <li>Newest</li>
                    </a>
                    <a href="#" onClick={this.sortOldestHandler}>
                      <li>Oldest</li>
                    </a>
                    <a href="#" onClick={this.sortAsceHandler}>
                      <li>Sort A-Z</li>
                    </a>
                    <a href="#" onClick={this.sortDescHandler}>
                      <li>Sort Z-A</li>
                    </a>
                    <li>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={this.state.queryString}
                        onChange={(event) => {
                          this.setState({
                            queryString: event.target.value,
                          });
                          this.searchHandler();
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              {this.state.showSpinner ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="orange-spinner"></div>
                </div>
              ) : (
                <></>
              )}
              {this.state.myOrders.map((el) => (
                <MyOrderComponent el={el} />
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
        ) : (
          <section className="explore-pane">
            <div className="loader-explore-pane">
              <div className="spinner-container">
                <div className="spinner"></div>
                <img
                  className="spinner-icon"
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                />
              </div>
              <div className="loader-text">Looking for your orders ...</div>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default MyOrdersPage;
