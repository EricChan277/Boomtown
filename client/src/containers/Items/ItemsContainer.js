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
        // console.log(itemsObj);
        items = itemsObj[0];
        user = itemsObj[1];
        items.map((item, itemowner) => {
          //   console.log(item);
          user.map((user, id) => {
            // console.log(user);
            if (item.itemowner == user.id) {
              //   console.log("hello");
              item.itemowner = user;
              //   console.log(item);
            }
            this.setState({ isLoading: false, item: items });
          });
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Items />
      </div>
    );
  }
}

export default ItemsContainer;
