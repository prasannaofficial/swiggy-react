import React from "react";

const RestCard = ({ obj, history }) => {
    const {
        id,
        imgLink,
        name,
        cuisines,
        avgRating,
        duration,
        costForTwoString,
        shortDiscount,
        locality,
        area,
        menuCategory,
        quickView,
    } = obj;
    return (
        <>
            <div className="rest-card">
                <div
                    onClick={() => {
                        history.push("/orders/" + id);
                    }}
                >
                    <img src={imgLink} width="254px" height="160px" />
                    <div className="rest-name">{name}</div>
                    <div className="rest-tag">{cuisines}</div>
                    <div className="rest-row1">
                        <div className="rest-row1-rating">
                            <ion-icon name="star"></ion-icon>
                            <div>&nbsp;{avgRating}</div>
                        </div>
                        <div>•</div>
                        <div>{duration}</div>
                        <div>•</div>
                        <div className="nVWSi">{costForTwoString}</div>
                    </div>
                    <div className="rest-row2">
                        <ion-icon name="gift"></ion-icon>
                        {shortDiscount}
                    </div>
                </div>
                <div
                    className="rest-row3"
                    data-toggle="modal"
                    data-target={"#rest" + id}
                >
                    Quick View
                </div>
            </div>
            <div
                className="modal fade quick-view"
                id={"rest" + id}
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                            <h4 className="modal-title">{name}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="menu-list">
                                <div className="menu-title">MENU</div>
                                <div className="menu-address">{`${locality}, ${area}`}</div>
                                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/QuickMenu-separator_emjojk" />
                                <ul>
                                    {menuCategory.map((el) => (
                                        <li>{el}</li>
                                    ))}
                                </ul>
                                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/QuickMenu-separator_emjojk" />
                            </div>
                            <div className="menu-img">
                                {quickView.map((el) => (
                                    <div className="img-holder">
                                        <img
                                            src={el.imgLink}
                                            width="112"
                                            height="71"
                                        />
                                        <div>{el.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RestCard;
