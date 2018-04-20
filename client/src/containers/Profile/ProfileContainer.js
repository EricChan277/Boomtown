import React, { Component } from "react";
import Profile from "./Profile";
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import {
  getDatafromUrls
  // getDatafromProfileUrl
} from "../../redux/modules/items";

class ProfileContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getDatafromUrls());
  }

  render() {
    return this.props.isLoading ? (
      <p>Loading...</p>
    ) : (
      <Masonry>
        <Profile itemsData={this.props.itemsData.items} />
      </Masonry>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  itemsData: state.items.itemsData,
  itemFilters: state.items.itemFilters
});

export default connect(state => {
  return {
    itemsData: state.item,
    isLoading: state.isLoading
  };
})(ProfileContainer);
