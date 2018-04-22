import React from 'react';
import ItemCardList from '../../components/ItemCardList';
import './styles.css';

const Items = props => (
    <div className="itemsWrapper">
        <ItemCardList itemsData={props.itemsData} />
    </div>
);

export default Items;
