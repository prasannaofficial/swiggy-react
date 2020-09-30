import React from "react";

const CartItemComponent = ({ menuItem, decrement, increment }) => {
    const { name, id, quantity, subTotal } = menuItem;
    return (
        <div className="cartItem">
            <div className="cartItem-col">
                <ion-icon
                    className="veg-icon"
                    name="heart-circle-outline"
                ></ion-icon>
            </div>
            <div className="cartItem-name cartItem-col">{name}</div>
            <div className="addItem cartItem-col">
                <div onClick={() => decrement(id)}>-</div>
                <div>{quantity}</div>
                <div onClick={() => increment(id)}>+</div>
            </div>
            <div className="cartItem-col">₹{subTotal}</div>
        </div>
    );
};

export default CartItemComponent;
