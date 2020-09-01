import React from 'react';
import HeadingSection from './HeadingSection';
import ListSection from './ListSection';
import './RestaurantsPaneComponent.css';

const RestaurantsPaneComponent = () =>{
    return(
        <section class="restaurants-pane">
            <HeadingSection/>
            <ListSection/>
        </section>
    );
}

export default RestaurantsPaneComponent;