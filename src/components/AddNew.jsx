import { useState, useEffect } from "react";

const AddNew = ({ completed, URL, getData }) => {
  const [clicked, setClicked] = useState(false);
  const [item, setItem] = useState("");
  const [notes, setNotes] = useState("");

  
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  const handleClick = () => {
    setClicked(true);
  };
  //post one request
  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item, notes, completed }),
    });
    getData();
    setClicked(false)
  };
  useEffect(() => {
    if (item) {
      postData();
    }
  }, []);

  if (clicked) {
    return (
      <div className="addNewDivFormDiv">
        <form onSubmit={postData}>
          <input
            className="addNewItem"
            type="text"
            name="item"
            value={item}
            placeholder="What item do you want?"
            onChange={handleItemChange}
          />
          <input
            className="addNewItem"
            type="text"
            name="notes"
            placeholder="notes..."
            value={notes}
            onChange={handleNotesChange}
          />
          <button type="submit" className="addNewButton">
            Add To List
          </button>
        </form>
      </div>
    );

  } else {
    return (
      <div className="addNewDiv" onClick={handleClick}>
        <h1 id="addItemh2">+ Add item</h1>
      </div>
    );
  }
};
export default AddNew;
