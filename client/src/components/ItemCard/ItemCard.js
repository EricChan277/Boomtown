import React from "react";
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

const ItemCard = props => {
  const item = props.itemsData;
  return (
    <Card>
      <CardMedia>
        <img src={item.imageurl} alt="" />
      </CardMedia>

      <CardHeader title={item.itemowner.fullname}>
        <Gravatar email={item.itemowner.email} />
      </CardHeader>

      <CardTitle title={item.title} />
      <CardText>{item.description}</CardText>
      <CardActions>
        <FlatButton label="Borrow" />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
