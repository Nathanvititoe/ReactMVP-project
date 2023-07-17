import { useState } from "react";

const Notes = ({
  setNotes,
  item,
  notesSelected,
  setNotesSelected,
  saveItem,
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
