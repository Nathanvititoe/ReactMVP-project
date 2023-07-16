import Checkbox from "./Checkbox";
import { useState, useEffect } from "react";

const ListItems = ({ item, setItems }) => {
  const URL = 'http://localhost:3001/items'
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
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "DELETE"
    });
    if(res.ok) {
      setItems(prevItems => prevItems.filter(prevItem => prevItem.itemid !== item.itemid))
    }
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
