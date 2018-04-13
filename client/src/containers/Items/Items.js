import React from "react";
import ItemCardList from "../../components/ItemCardList";

const Items = props => {
  return (
    <div>
      <ItemCardList itemsData={props.itemsData} />
      {/* {console.log(props.itemsData)} */}
    </div>
  );
};

export default Items;
