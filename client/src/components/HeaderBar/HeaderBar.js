import React from "react";
import "./styles.css";
import AppBar from "material-ui/AppBar";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import logo from "../../images/boomtown-logo.svg";

const HeaderBar = props => {
  return (
    <AppBar
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center"
      }}
      titleStyle={{
        display: "none"
      }}
      iconElementLeft={<img src={logo} style={{ height: "40px" }} />}
    >
      <SelectField
        floatingLabelText="Search by tag here"
        style={{
          display: "flex",
          alignItems: "flex-start"
        }}
      >
        <MenuItem value={2} primaryText="Electronics" />
        <MenuItem value={3} primaryText="Household Items" />
        <MenuItem value={4} primaryText="Musical Instruments" />
        <MenuItem value={5} primaryText="Physical Media" />
        <MenuItem value={6} primaryText="Recreational Equipment" />
        <MenuItem value={7} primaryText="Sporting Goods" />
        <MenuItem value={8} primaryText="Tools" />
      </SelectField>

      <div>
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
    </AppBar>
  );
};

export default HeaderBar;
