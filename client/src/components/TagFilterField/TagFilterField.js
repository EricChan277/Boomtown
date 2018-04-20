import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const TagFilterField = () => {
  return (
    <SelectField multiple hintText="Search by tag here" onChange={() => true}>
      <MenuItem value={2} primaryText="Electronics" />
      <MenuItem value={3} primaryText="Household Items" />
      <MenuItem value={4} primaryText="Musical Instruments" />
      <MenuItem value={5} primaryText="Physical Media" />
      <MenuItem value={6} primaryText="Recreational Equipment" />
      <MenuItem value={7} primaryText="Sporting Goods" />
      <MenuItem value={8} primaryText="Tools" />
    </SelectField>
  );
};

export default TagFilterField;
