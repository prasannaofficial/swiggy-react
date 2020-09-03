import React from 'react';
import './ExploreComponent.css';
import img1 from '../../img/1.jpeg';
import img2 from '../../img/2.jpeg';
import img3 from '../../img/3.jpeg';
import img4 from '../../img/4.jpeg';


const ExploreComponent = () =>{
    return(
        <section className="explore-pane">
            <div className="responsive image-container main-container">
                <img className="explore-img" src={img1}/>
                <img className="explore-img" src={img2}/>
                <img className="explore-img" src={img3}/>
                <img className="explore-img" src={img4}/>
                <img className="explore-img" src={img1}/>
                <img className="explore-img" src={img2}/>
                <img className="explore-img" src={img3}/>
                <img className="explore-img" src={img4}/>
            </div>
        </section>
    );
}

export default ExploreComponent;