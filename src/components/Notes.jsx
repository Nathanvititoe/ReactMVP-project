import { useState } from "react";

const Notes = ({
  setNotes,
  item,
  notesSelected,
  setNotesSelected,
}) => {
  const handleClickNotes = () => {
    setNotesSelected(true);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async () => {
    await saveItem();
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

  if (notesSelected) {
    return (
      <>
        <input onChange={handleNotesChange} />
        <button type="button" onClick={handleSubmit}>
          save
        </button>
      </>
    );
  } else {
    return (
      <p id="notes" onClick={handleClickNotes}>
        {item.notes}
      </p>
    );
  }
};
export default Notes;
