import React from 'react';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';

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

ItemCardList.propTypes = {
    itemsData: PropTypes.array.isRequired
};

export default ItemCardList;
