import Checkbox from "./Checkbox";
import { useState } from "react";

const ListItems = ({ item, setItems }) => {
  const URL = "http://localhost:3001/items";
  const [checked, setChecked] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [notes, setNotes] = useState("");
  const [itemSelected, setItemSelected] = useState(false);
  const [notesSelected, setNotesSelected] = useState(false);

  const handleSubmit = async () => {
    await saveItem();
   refreshItem();
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
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

  const saveItem = async () => {
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: currentItem, notes: notes }),
    });
    if (res.ok) {
      setItemSelected(false);
      setNotesSelected(false);
    }
  };

  const refreshItem = async () => {
    const res = await fetch(`${URL}/${item.itemid}`);
    const data = await res.json();
    setCurrentItem(data.item);
  };

  // const refreshNotes = async ()  => {
  //   console.log(item.itemid)
  //       const res = await fetch(`${URL}/${item.itemid}`);
  //       const data = await res.json();
  //       setCurrentItem(data.notes);
  //     }

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
              value={currentItem}
              onChange={handleItemChange}
              className="selectedItemInput"
            />
          </div>
          <p id="notes" onClick={handleClickNotes}>
            {item.notes}
          </p>
          <button type="button" onClick={handleSubmit}>
            save
          </button>
        </div>
      </>
    );
  } else if (notesSelected) {
    console.log(notes);
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
              value={notes}
              onChange={handleNotesChange}
              className="selectedNotesInput"
            />
          </div>

          <button type="button" onClick={handleSubmit}>
            save
          </button>
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
