import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';
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
            <Loader />
        ) : (
            <Items itemsData={this.filterItems(this.props.itemsData)} />
        );
    }
}

ItemsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.object.isRequired,
    itemsData: PropTypes.array.isRequired
};

export default connect(state => ({
    itemsData: state.itemsData,
    isLoading: state.isLoading
}))(ItemsContainer);
