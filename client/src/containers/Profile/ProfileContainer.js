import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';
import items, { getDatafromUrls } from '../../redux/modules/items';
import Profile from './Profile';

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getDatafromUrls());
    }

    render() {
        return this.props.isLoading ? (
            <Loader />
        ) : (
            <Masonry>
                <Profile itemsData={this.props.items} />
            </Masonry>
        );
    }
}

ProfileContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
};

export default connect(state => ({
    itemsData: state.item,
    isLoading: state.isLoading
}))(ProfileContainer);
