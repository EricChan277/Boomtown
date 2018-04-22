import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDatafromUrls } from '../../redux/modules/items';
import Items from './Items';

class ItemsContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getDatafromUrls());
    }

    filterItems = itemsData => {
        if (itemsData.itemFilters.length > 0) {
            const filteredItems = itemsData.items.filter(
                item =>
                    item.tags.filter(tag =>
                        itemsData.itemFilters.find(filter => filter === tag)
                    ).length
            );
            return filteredItems;
        }
        return itemsData.items;
    };

    render() {
        return this.props.isLoading ? (
            <p>Loading...</p>
        ) : (
            <Items itemsData={this.filterItems(this.props.itemsData)} />
        );
    }
}

export default connect(state => ({
    itemsData: state.itemsData,
    isLoading: state.isLoading
}))(ItemsContainer);
