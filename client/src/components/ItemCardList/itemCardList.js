import React from "react";
import ItemCard from "../ItemCard";

const ItemCardList = props => {
  return (
    <div>
      {/* {console.log(props.itemsData)} */}
      {/* {props.itemsData.map((item, index) => {
        props.itemsData.forEach(item => {
          console.log(item);
        });
      })} */}
      <ItemCard />
    </div>
  );
};

export default ItemCardList;
