import { useState, useEffect } from "react";
const Checkbox = ({ item, URL, setItems, getData }) => {
  const updatedCheckbox = { ...item, completed: !item.completed };
  const handleClick = async () => {
    item.completed = !item.completed;
    await saveItem(updatedCheckbox);
  };

  const saveItem = async (e, updatedCheckbox) => {
    // e.preventDefault();
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedCheckbox.completed }),
    });

    if (res.ok) {
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemid === item.itemid
            ? { ...prevItem, completed: item.completed }
            : prevItem
        )
      );
    }
    getData();
  };

  return (
    <div id="check">
      <input
        className="myCheckbox"
        type="checkbox"
        checked={item.completed}
        onChange={handleClick}
      />
    </div>
  );
};
export default Checkbox;
