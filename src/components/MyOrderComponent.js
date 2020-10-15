import React from "react";

const MyOrderComponent = ({ el }) => {
  let itemsName = [];
  el.orders.forEach((element) => {
    itemsName.push(element.name + " x " + element.quantity);
  });
  let date = new Date(el.date);
  return (
    <div className="pastorder-container">
      <div className="top">
        <div className="left-img">
          <img height="100px" width="150px" src={el.restimg} />
        </div>
        <div className="right-detail">
          <div className="restname">{el.restname}</div>
          <div className="restarea">{el.restarea}</div>
          <div className="order-details">
            <span>ORDER #{el["_id"].substring(10)}</span> |{" "}
            <span>{date.toDateString()}</span>,{" "}
            <span>{date.toLocaleTimeString()}</span>
          </div>
          <div className="view-details-btn">VIEW DETAILS</div>
        </div>
      </div>
      <div className="bottom">
        <div className="row1">
          <div>{itemsName.join(", ")}</div>
          <div>Total Paid: ₹{el.totalprice}</div>
        </div>
        <div className="row2">
          {el.userdetails ? (
            <div className="user-details-admin">
              <div>
                <span>Name : </span>
                {el.userdetails[0] ? el.userdetails[0].name : "Name"}
              </div>
              <div>
                <span>Email : </span>
                {el.userdetails[0] ? el.userdetails[0].email : "Email"}
              </div>
            </div>
          ) : (
            <>
              <a>REORDER</a>
              <a>HELP</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrderComponent;
