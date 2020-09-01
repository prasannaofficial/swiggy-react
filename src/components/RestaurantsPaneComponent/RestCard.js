import React from 'react';
import MenuSeperator from '../../img/menuSeperator.png';
import quickView01 from '../../img/quickView01.jpeg';
import quickView02 from '../../img/quickView02.jpeg';
import quickView03 from '../../img/quickView03.jpeg';
import quickView04 from '../../img/quickView04.jpeg';
import quickView05 from '../../img/quickView05.jpeg';
import quickView06 from '../../img/quickView06.jpeg';


const RestCard = ({obj}) => {
    const {id,src,name,tagline,rating,duration,price,offer} = obj;
    return(
        <>
            <div className="rest-card">
                <img src={src} width="254px" height="160px"/>
                <div className="rest-name">{name}</div>
                <div className="rest-tag">{tagline}</div>
                <div className="rest-row1">
                    <div className="rest-row1-rating">
                        <ion-icon name="star"></ion-icon>
                        <div>&nbsp;{rating}</div>
                    </div>
                    <div>•</div>
                    <div>{duration}</div>
                    <div>•</div>
                    <div className="nVWSi">{price}</div>
                </div>
                <div className="rest-row2">
                    <ion-icon name="gift"></ion-icon>
                    {offer}
                </div>
                <div className="rest-row3" data-toggle="modal" data-target={'#rest'+id}>
                    Quick View
                </div>
            </div>
            <div className="modal fade quick-view" id={'rest'+id} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{name}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="menu-list">
                                <div className="menu-title">MENU</div>
                                <div className="menu-address">P.N Road, North Tirupur</div>
                                <img src={MenuSeperator}/>
                                <ul>
                                    <li>Lunch Special</li>
                                    <li>Chinese</li>
                                    <li>North Indian</li>
                                    <li>South Indian</li>
                                    <li>Savouries</li>
                                    <li>Sweets</li>
                                    <li>Paratha</li>
                                </ul>
                                <img src={MenuSeperator}/>
                            </div>
                            <div className="menu-img">
                                <div className="img-holder">
                                    <img src={quickView01} width="112" height="71"/>
                                    <div>Onion Rava Dosai</div>
                                </div>
                                <div className="img-holder">
                                    <img src={quickView02} width="112" height="71"/>
                                    <div>Ghee Roast</div>
                                </div>
                                <div className="img-holder">
                                    <img src={quickView03} width="112" height="71"/>
                                    <div>Idly [2 Nos]</div>
                                </div>
                                <div className="img-holder">
                                    <img src={quickView04} width="112" height="71"/>
                                    <div>Mini Idly</div>
                                </div>
                                <div className="img-holder">
                                    <img src={quickView05} width="112" height="71"/>
                                    <div>Onion Uttapam</div>
                                </div>
                                <div className="img-holder">
                                    <img src={quickView06} width="112" height="71"/>
                                    <div>Poori [2 Nos]</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestCard;