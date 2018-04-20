import React, { Component } from "react";
import Items from "./Items";
import { connect } from "react-redux";
import { getDatafromUrls } from "../../redux/modules/items";

class ItemsContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getDatafromUrls());
  }

  filterItems = itemsData => {
    if (itemsData.itemFilters.length > 0) {
      let filteredItems = itemsData.items.filter(item => {
        return item.tags.filter(tag =>
          itemsData.itemFilters.find(filter => filter === tag)
        ).length;
      });
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
