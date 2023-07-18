import { useState, useEffect } from "react";

const Notes = ({
  setNotes,
  item,
  notesSelected,
  setNotesSelected,
  URL,
  setItems,
  notes,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClickNotes = () => {
    setNotesSelected(true);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveItem();
  };

  const saveItem = async () => {
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: notes }),
    });

    if (res.ok) {
      setNotesSelected(false);
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemid === item.itemid
            ? { ...prevItem, notes: notes }
            : prevItem
        )
      );
    }
  };

  useEffect(() => {
    if (submitted) {
      saveItem();
      setSubmitted(false);
    }
  }, [submitted]);

  useEffect(() => {
    if (notesSelected && notes !== item.notes) {
      setNotes(item.notes);
    }
  }, [notesSelected, item.notes]);

  if (notesSelected) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input value={notes} onChange={handleNotesChange} className="addNewItem"/>
          <button type="submit" className="addNewButton">
            save
          </button>
        </form>
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
