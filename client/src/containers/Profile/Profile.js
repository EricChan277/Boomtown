import React from "react";
import Masonry from "react-masonry-component";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";

import "./styles.css";
const Profile = props => {
  const item = props.itemsData;
  // console.log(item.itemowner);
  return (
    <Card>
      <CardMedia>
        <img src={item.imageurl} alt="" />
      </CardMedia>
      <CardHeader
        avatar={<Gravatar email={item.itemowner.email} />}
        title={item.itemowner.fullname}
      />
    </Card>
  );
};
export default Profile;
