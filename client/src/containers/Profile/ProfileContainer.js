import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';
import { getDatafromProfileUrl } from '../../redux/modules/items';
import Profile from './Profile';
import ItemCardList from '../../components/ItemCardList';

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getDatafromProfileUrl());
    }

    render() {
        console.log(this.props.users);
        return this.props.isLoading ? (
            <Loader />
        ) : (
            <Masonry>
                <Profile itemsData={this.props.itemsData} />
                {/* <ItemCardList itemsData={this.props.itemsData} /> */}
            </Masonry>
        );
    }
}

ProfileContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
    //     isLoading: PropTypes.object.isRequired,
    //     items: PropTypes.array.isRequired
};

export default connect(state => ({
    users: state.users,
    itemsData: state.itemsData,
    isLoading: state.isLoading
}))(ProfileContainer);
