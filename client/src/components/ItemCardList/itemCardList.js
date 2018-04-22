import React from 'react';
import Masonry from 'react-masonry-component';

import ItemCard from '../ItemCard';
import './styles.css';

const ItemCardList = props => (
    <div className="itemCardListWrapper">
        <Masonry>
            {props.itemsData.map((item, index) => (
                <div key={index} className="itemCardWrapper">
                    <ItemCard itemsData={item} />
                </div>
            ))}
        </Masonry>
    </div>
);

export default ItemCardList;
