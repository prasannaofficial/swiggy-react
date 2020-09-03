import React,{Component} from 'react';
import HeadingSection from './HeadingSection';
import ListSection from './ListSection';
import './RestaurantsPaneComponent.css';

const RestaurantsPaneComponent = ({history}) =>{
    return(
        <section className="restaurants-pane"
        >
            <HeadingSection/>
            <ListSection
            history={history}
            />
        </section>
    );
}

export default RestaurantsPaneComponent;