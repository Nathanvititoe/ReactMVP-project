import { useState, useEffect } from "react";

const Item = ({
  item,
  itemSelected,
  setItemSelected,
  currentItem,
  setCurrentItem,
  URL,
  setItems,
  getData,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClickItem = (e) => {
    setItemSelected(true);
  };

  const handleItemChange = (e) => {
    setCurrentItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const saveItem = async (e) => {
    e.preventDefault();
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: currentItem }),
    });

    if (res.ok) {
      setItemSelected(false);
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemid === item.itemid
            ? { ...prevItem, item: currentItem }
            : prevItem
        )
      );
    }
    getData();
    setItemSelected(false);
  };

  useEffect(() => {
    if (submitted) {
      saveItem();
      setSubmitted(false);
    }
  }, [submitted]);

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
            className="addNewItem"
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
