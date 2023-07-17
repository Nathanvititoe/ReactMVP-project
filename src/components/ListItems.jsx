import Checkbox from "./Checkbox";
import { useState,useEffect } from "react";
import Item from "./Item.jsx";
import Notes from "./Notes.jsx";

const ListItems = ({ item, setItems, items }) => {
  const URL = "http://localhost:3001/items";
  const [checked, setChecked] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [itemSelected, setItemSelected] = useState(false);
  const [notesSelected, setNotesSelected] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

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
      body: JSON.stringify({ item: currentItem, notes: notes}),
    });
    if (res.ok) {
      setItemSelected(false);
      setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.itemid === item.itemid ? { ...prevItem, item: currentItem, notes: notes } : prevItem
      )
    );
    }
  };
  

  useEffect(() => {
    if(submitted) {
      saveItem();
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <>
      <div className={checked ? "listItemsDivClicked" : "listItemsDiv"}>
        <div id="checkAndItem">
          <p onClick={handleDelete} id="deleteItem">
            x
          </p>
          <Checkbox item={item} setChecked={setChecked} checked={checked} />
          <Item
          saveItem={saveItem}
            item={item}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
            setSubmitted={setSubmitted}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        </div>
        <Notes
          item={item}
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
