import Checkbox from "./Checkbox";

import { useState } from "react";
const ListItems = ({ item }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    console.log('click');
  };

  const handleDelete = () => {
    if(confirm('Are you sure you want to delete this item?')) {
      deleteItem();
    }
  }
  const deleteItem = async () => {
    console.log('deleted')
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({item, notes}),
    });
  };

  return (
    <>
      <div className={checked ? 'listItemsDivClicked' : "listItemsDiv"} >
        <div id="checkAndItem">
          <p onClick={handleDelete}>x</p>
          <Checkbox item={item} setChecked={setChecked} checked={checked}/>
          <h2 id="itemh2" onClick={handleClick}>{item.item}</h2>
        </div>
        <p id="notes" onClick={handleClick}>{item.notes}</p>
      </div>
    </>
  );
};

export default ListItems;
