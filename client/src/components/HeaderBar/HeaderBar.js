import React from "react";
import "./styles.css";
import AppBar from "material-ui/AppBar";
import TagFilterField from "../TagFilterField";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import Logo from "../../images/boomtown-logo.svg";

const HeaderBar = props => {
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
          <TagFilterField />
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
};

export default HeaderBar;
