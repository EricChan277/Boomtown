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

const ItemCard = props => {
  return (
    <Card>
      <CardHeader title="CardHeader" subtitle="Subtitle" />

      <CardMedia overlay={<CardTitle title="Placeholder Image Title" />}>
        <img src="http://via.placeholder.com/350x150" alt="" />
      </CardMedia>
      <CardText>Sample Card Text</CardText>
      <CardActions>
        <FlatButton label="Sample Button" />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
