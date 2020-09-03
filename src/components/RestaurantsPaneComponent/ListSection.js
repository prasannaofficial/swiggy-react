import React,{Component} from 'react';
import './ListSection.css';
import RestCard from './RestCard';

import rest01 from '../../img/rest01.jpeg';
import rest02 from '../../img/rest02.jpeg';
import rest03 from '../../img/rest03.jpeg';
import rest04 from '../../img/rest04.jpeg';
import rest05 from '../../img/rest05.jpeg';
import rest06 from '../../img/rest06.jpeg';
import rest07 from '../../img/rest07.jpeg';
import rest08 from '../../img/rest08.jpeg';

const RestObj=[
    {
        id:'01',
        src:rest01,
        name:'Burger Hut',
        tagline:'Fast Food, Beverages',
        rating:'4.0',
        duration:'34 MINS',
        price:'₹200 FOR TWO',
        offer:'30% off | Use BIRTHDAY'
    },
    {
        id:'02',
        src: rest02,
        name:'A2B Veg',
        tagline:'South Indian, North Indian',
        rating:'4.1',
        duration:'36 MINS',
        price:'₹200 FOR TWO',
        offer:'50% off | Use BIRTHDAY'
    },
    {
        id:'03',
        src: rest03,
        name:'Dindigul Sri Alagappa Briyani',
        tagline:'Biryani, Chinese, North Indian, South Indian',
        rating:'4.3',
        duration:'34 MINS',
        price:'₹200 FOR TWO',
        offer:'30% off | Use BIRTHDAY'
    },
    {
        id:'04',
        src: rest04,
        name:'Aththa Biriyani',
        tagline:'South Indian',
        rating:'3.9',
        duration:'150 MINS',
        price:'₹200 FOR TWO',
        offer:'20% off | Use BIRTHDAY'
    },
    {
        id:'05',
        src: rest05,
        name:'7th Heaven',
        tagline:'Beverages, Continental, Desserts',
        rating:'4.0',
        duration:'42 MINS',
        price:'₹300 FOR TWO',
        offer:'40% off | Use BIRTHDAY'
    },
    {
        id:'06',
        src: rest06,
        name:'Arafa Chicken Park',
        tagline:'South Indian, Chinese, Arabian, Tandoor',
        rating:'3.7',
        duration:'34 MINS',
        price:'₹200 FOR TWO',
        offer:'40% off | Use BIRTHDAY'
    },
    {
        id:'07',
        src: rest07,
        name:'Sri Chettinadu Mess',
        tagline:'South Indian',
        rating:'3.3',
        duration:'38 MINS',
        price:'₹200 FOR TWO',
        offer:'40% off | Use BIRTHDAY'
    },
    {
        id:'08',
        src: rest08,
        name:'Dindigul Asbas Briyani Centre',
        tagline:'South Indian',
        rating:'3.8',
        duration:'40 MINS',
        price:'1500 FOR TWO',
        offer:'10% off | Use BIRTHDAY'
    }
]

const ListSection = ({history}) => {
    return(
        <div className="rest-cards-container main-container">
            <div className="rest-cards-row"
            >
            {
                RestObj.map((obj,id) => <RestCard 
                    obj={obj}
                    restId={id}
                    history={history}
                    />)
            }
            </div>
        </div>
    );
}

export default ListSection;