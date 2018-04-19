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
import { Link } from "react-router-dom";

const ItemCard = props => {
  const item = props.itemsData;
  // console.log(item);
  return (
    <Card>
      <CardMedia>
        <img src={item.imageurl} alt="" />
      </CardMedia>
      <Link to={`/profile/${item.itemowner.id}`}>
        <CardHeader
          avatar={<Gravatar email={item.itemowner.email} />}
          title={item.itemowner.fullname}
        />
      </Link>
      />
      <CardTitle title={item.title} />
      <CardText>{item.description}</CardText>
      <CardActions>
        <FlatButton label="Borrow" />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
