import { useState } from "react";

const Item = ({item, setCurrentItem, saveItem, itemSelected, setItemSelected}) => {
  
  
  const handleClickItem = (e) => {
    setItemSelected(true);
  };

  const handleItemChange = (e) => {
    // const index = items.indexOf(item);
    setCurrentItem(e.target.value);
    // items[index].item = currentItem;
  };

  const handleSubmit = async () => {
    await saveItem();
  };

  if (itemSelected) {
    return (
      <>
        <input  onChange={handleItemChange} />
        <button type="button" onClick={handleSubmit}>
          save
        </button>
      </>
    );
  } else {
    return <h2 id="itemh2" onClick={handleClickItem}>{item.item}</h2>;
  }
};
export default Item;
