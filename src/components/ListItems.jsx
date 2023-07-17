import Checkbox from "./Checkbox";
import { useState } from "react";
import Item from "./Item.jsx";
import Notes from "./Notes.jsx";

const ListItems = ({ item, setItems, items }) => {
  const URL = "http://localhost:3001/items";
  const [checked, setChecked] = useState(false);
  const [notes, setNotes] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [itemSelected, setItemSelected] = useState(false);
  const [notesSelected, setNotesSelected] = useState(false);

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

  // const refreshItem = async () => {
  //   const res = await fetch(`${URL}/${item.itemid}`);
  //   const data = await res.json();
  //   setCurrentItem(data.item);
  // };

  return (
    <>
      <div className={checked ? "listItemsDivClicked" : "listItemsDiv"}>
        <div id="checkAndItem">
          <p onClick={handleDelete} id="deleteItem">
            x
          </p>
          <Checkbox item={item} setChecked={setChecked} checked={checked} />
          <Item
            item={item}
            setCurrentItem={setCurrentItem}
            saveItem={saveItem}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </div>
        <Notes
          item={item}
          saveItem={saveItem}
          notes={notes}
          setNotes={setNotes}
          setNotesSelected={setNotesSelected}
          notesSelected={notesSelected}
        />
      </div>
    </>
  );
};
export default ListItems;
