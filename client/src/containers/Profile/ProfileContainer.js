import React, { Component } from "react";
import Profile from "./Profile";
import Masonry from "react-masonry-component";

class ProfileContainer extends Component {
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
        items.map(item => {
          user.map(user => {
            if (item.itemowner == user.id) {
              item.itemowner = user;
            }
          });
        });
        this.setState({ isLoading: false, itemsData: items });
      }
    );
  }

  render() {
    return (
      <Masonry>
        {this.state.itemsData.map((item, index) => (
          <div key={index} className="profile-card-wrapper">
            <Profile itemsData={item} />
          </div>
        ))}
      </Masonry>
    );
  }
}

export default ProfileContainer;
