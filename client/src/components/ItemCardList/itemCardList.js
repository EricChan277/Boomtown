import React from "react";
import ItemCard from "../ItemCard";
import Masonry from "react-masonry-component";

import "./styles.css";

const ItemCardList = props => {
  return (
    <div className="itemCardListWrapper">
      <Masonry>
        {console.log(props.itemsData)}
        {props.itemsData.map((item, index) => (
          <div key={index} className="itemCardWrapper">
            <ItemCard itemsData={item} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ItemCardList;
