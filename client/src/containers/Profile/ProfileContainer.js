import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';

import { getDatafromUrls } from '../../redux/modules/items';
import Profile from './Profile';

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getDatafromUrls());
    }

    render() {
        return this.props.isLoading ? (
            <p>Loading...</p>
        ) : (
            <Masonry>
                <Profile itemsData={this.props.items} />
            </Masonry>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    itemsData: state.items.itemsData,
    itemFilters: state.items.itemFilters
});

export default connect(state => ({
    itemsData: state.item,
    isLoading: state.isLoading
}))(ProfileContainer);
