import Checkbox from "./Checkbox";

import { useState } from "react";
const ListItems = ({ item, setShowItem}) => {

  const handleClick = () => {
    setShowItem(true);
    console.log('click');
  };

  return (
    <>
      <div className="listItemsDiv" onClick={handleClick}>
        <div id="checkAndItem">
          <Checkbox item={item} />
          <h2 id="itemh2">{item.item}</h2>
        </div>
        <p id="notes">{item.notes}</p>
      </div>
    </>
  );
};

export default ListItems;
