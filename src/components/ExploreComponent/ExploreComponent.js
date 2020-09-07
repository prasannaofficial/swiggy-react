import React from 'react';
import './ExploreComponent.css';
import Slider from "react-slick";
import img1 from '../../img/1.jpeg';
import img2 from '../../img/2.jpeg';
import img3 from '../../img/3.jpeg';
import img4 from '../../img/4.jpeg';


const ExploreComponent = () =>{
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    }
    return(
        <section className="explore-pane">
            <Slider className="image-container main-container" {...settings}>
                    <img className="explore-img" src={img1}/>
                    <img className="explore-img" src={img2}/>
                    <img className="explore-img" src={img3}/>
                    <img className="explore-img" src={img4}/>
                    <img className="explore-img" src={img1}/>
                    <img className="explore-img" src={img2}/>
                    <img className="explore-img" src={img3}/>
                    <img className="explore-img" src={img4}/>
            </Slider>
        </section>
    );
}

export default ExploreComponent;