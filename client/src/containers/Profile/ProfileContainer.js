import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import { getDatafromUrls } from '../../redux/modules/items';
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
                {/* {console.log('hello')} */}
            </Masonry>
        );
    }
}

export default connect(state => ({
    itemsData: state.item,
    isLoading: state.isLoading
}))(ProfileContainer);
