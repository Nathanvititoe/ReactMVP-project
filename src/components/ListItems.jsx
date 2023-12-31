import Checkbox from "./Checkbox";
import { useState, useEffect } from "react";
import Item from "./Item.jsx";
import Notes from "./Notes.jsx";

const ListItems = ({ item, setItems, URL, getData }) => {
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

  return (
    <>
      <div className={item.completed ? "listItemsDivClicked" : "listItemsDiv"}>
        <div id="checkAndItem">
          <p onClick={handleDelete} id="deleteItem">
            x
          </p>
          <Checkbox item={item} URL={URL} setItems={setItems} getData={getData}/>
          <Item
            item={item}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            URL={URL}
            setItems={setItems}
            getData={getData}
          />
        </div>
        <Notes
          item={item}
          notes={notes}
          setNotes={setNotes}
          setNotesSelected={setNotesSelected}
          notesSelected={notesSelected}
          URL={URL}
          setItems={setItems}
          getData={getData}
        />
      </div>
    </>
  );
};
export default ListItems;
