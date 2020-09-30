import React from "react";

const MenuItemComponent = ({ menuItem, decrement, increment }) => {
    const { name, id, quantity, price, img } = menuItem;
    return (
        <div className="menuItem">
            <div className="left">
                <div className="row1">
                    <ion-icon
                        className="veg-icon"
                        name="heart-circle-outline"
                    ></ion-icon>
                    <ion-icon className="star-icon" name="star"></ion-icon>
                    <span>Bestseller</span>
                </div>
                <div className="row2">{name}</div>
                <div className="row3">₹{price}</div>
            </div>
            <div className="right">
                <img src={img} />
                <div className="addItem">
                    <div onClick={() => decrement(id)}>-</div>
                    <div>{quantity}</div>
                    <div onClick={() => increment(id)}>+</div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemComponent;
