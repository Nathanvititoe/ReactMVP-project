import { useState, useEffect } from "react";

const Item = ({ item, itemSelected, setItemSelected, setSubmitted, currentItem, setCurrentItem }) => {
  
  
  const handleClickItem = (e) => {
    setItemSelected(true);
  };

  const handleItemChange = (e) => {
    // const index = items.indexOf(item);
    setCurrentItem(e.target.value);
    // items[index].item = currentItem;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
  }
  
  
 useEffect(() => {
    if (itemSelected && currentItem !== item.item) {
      setCurrentItem(item.item);
    }
  }, [itemSelected, item.item]);

  if (itemSelected) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input 
          value={currentItem}
          onChange={handleItemChange} 
          />
          <button type="submit" className="addNewButton">
            save
          </button>
        </form>
      </>
    );
  } else {
    return (
      <h2 id="itemh2" onClick={handleClickItem}>
        {item.item}
      </h2>
    );
  }
};
export default Item;
