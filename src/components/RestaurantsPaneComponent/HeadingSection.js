import React from 'react';
import './HeadingSection.css';

const HeadingSection = () => {
    return(
        <div className="rest-head main-container">
			<h1>104 restaurants</h1>
			<ul>
				<li><span>Relavance</span></li>
				<li>Cost For Two</li>
				<li>Delivery Time</li>
				<li>Rating</li>
				<li><span>Filters</span>
					<ion-icon name="funnel-outline"></ion-icon>
				</li>
			</ul>
		</div>
    );
}

export default HeadingSection;