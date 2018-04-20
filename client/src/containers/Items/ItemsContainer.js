import React, { Component } from "react";
import Items from "./Items";
import { connect } from "react-redux";
import { getDatafromUrls } from "../../redux/modules/items";

class ItemsContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getDatafromUrls());
  }

  render() {
    return this.props.isLoading ? (
      <p>Loading...</p>
    ) : (
      <Items itemsData={this.props.itemsData.items} />
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
    itemsData: state.itemsData,
    isLoading: state.isLoading
  };
})(ItemsContainer);
