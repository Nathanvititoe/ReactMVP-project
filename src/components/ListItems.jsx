import Checkbox from "./Checkbox";
import { useState, useEffect } from "react";

const ListItems = ({ item, setItems }) => {
  const URL = "http://localhost:3001/items";
  const [checked, setChecked] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [itemSelected, setItemSelected] = useState(false);
  const [notesSelected, setNotesSelected] = useState(false);

  const handleItemChange = (e) => {
    setCurrentItem(e.target.value);
  };

  const handleClickItem = () => {
    setItemSelected(true);
  };

  const handleClickNotes = () => {
    setNotesSelected(true);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem();
    }
  };
  const deleteItem = async () => {
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.itemid !== item.itemid)
      );
    }
  };
  if (itemSelected) {
    return (
      <>
        <div className={checked ? "listItemsDivClicked" : "listItemsDiv"}>
          <div id="checkAndItem">
            <p onClick={handleDelete} id="deleteItem">
              x
            </p>
            <Checkbox item={item} setChecked={setChecked} checked={checked} />
            <input
              type="text"
              placeholder={item.item}
              name="item"
              value={item.item}
              onChange={handleItemChange}
              className="selectedItemInput"
            />
          </div>
          <p id="notes" onClick={handleClickNotes}>
            {item.notes}
          </p>
          <button>save</button>
        </div>
      </>
    );
  } else if (notesSelected) {
    return (
      <>
        <div className={checked ? "listItemsDivClicked" : "listItemsDiv"}>
          <div id="checkAndItem">
            <p onClick={handleDelete} id="deleteItem">
              x
            </p>
            <Checkbox item={item} setChecked={setChecked} checked={checked} />
            <h2 id="itemh2" onClick={handleClickItem}>
              {item.item}
            </h2>
            <input
              type="text"
              placeholder={item.notes}
              name="notes"
              value={item.notes}
              onChange={handleItemChange}
              className="selectedNotesInput"
            />
          </div>

          <button>save</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={checked ? "listItemsDivClicked" : "listItemsDiv"}>
          <div id="checkAndItem">
            <p onClick={handleDelete} id="deleteItem">
              x
            </p>
            <Checkbox item={item} setChecked={setChecked} checked={checked} />
            <h2 id="itemh2" onClick={handleClickItem}>
              {item.item}
            </h2>
          </div>
          <p id="notes" onClick={handleClickNotes}>
            {item.notes}
          </p>
        </div>
      </>
    );
  }
};

export default ListItems;
