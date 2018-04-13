import React, { Component } from "react";
import Items from "./Items";

class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      itemsData: []
    };
  }

  componentDidMount() {
    const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];

    this.setState({ isLoading: true });

    let items = [];
    let user = [];

    Promise.all(urls.map(url => fetch(url).then(resp => resp.json()))).then(
      itemsObj => {
        items = itemsObj[0];
        user = itemsObj[1];
        // console.log(items);
        items.map(item => {
          // console.log(item);
          user.map(user => {
            // console.log(user);
            if (item.itemowner == user.id) {
              //   console.log("hello");
              item.itemowner = user;
              // console.log(items);
            }
          });
        });
        this.setState({ isLoading: false, itemsData: items });
        // console.log(this.state.itemsData);
      }
    );
  }

  render() {
    return <Items itemsData={this.state.itemsData} />;
  }
}

export default ItemsContainer;
