import React, { Component } from "react";
import "./styles.css";
import AppBar from "material-ui/AppBar";
import TagFilterField from "../TagFilterField";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import Logo from "../../images/boomtown-logo.svg";
import { getDatafromUrls } from "../../redux/modules/items";

import { connect } from "react-redux";

class HeaderBar extends Component {
  componentDidMount() {
    const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];
    this.props.dispatch(getDatafromUrls(urls));
  }

  getTags = items => {
    let tags = [];
    if (items.length && items[0] !== undefined) {
      items.map(item => {
        if (item.tags !== undefined) {
          if (!item.tags.includes(undefined)) {
            item.tags.map(tag => {
              if (!tags.includes(tag)) {
                tags.push(tag);
              }
            });
          }
        }
      });
    }
    return tags;
  };

  render() {
    const tags = this.getTags(this.props.itemsData.items);
    console.log(tags);

    return (
      <AppBar
        style={{
          display: "flex",
          backgroundColor: "white",
          alignItems: "center"
        }}
        titleStyle={{
          display: "none"
        }}
        iconElementLeft={
          <div className="titleContainer">
            <Link to={"/"}>
              <img
                src={Logo}
                alt=""
                style={{
                  height: "40px"
                }}
              />
            </Link>
            {tags.length && <TagFilterField tags={tags} />}
          </div>
        }
        iconElementRight={
          <div className="headerBtnWrapper">
            <RaisedButton
              label="my profile"
              labelColor="white"
              buttonStyle={{
                backgroundColor: "#48c6ef"
              }}
            />
            <RaisedButton
              label="logout"
              labelColor="white"
              buttonStyle={{
                backgroundColor: "black"
              }}
            />
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    itemsData: state.itemsData
  };
};
export default connect(mapStateToProps)(HeaderBar);
