import { useState, useEffect } from "react";

const AddNew = () => {
  const URL = "http://localhost:3001/items";
  const [clicked, setClicked] = useState(false);
  const [item, setItem] = useState("");
  const [notes, setNotes] = useState("");
//   const [submitted, setSubmitted] = useState(false);

  const handleItemChange = (e) => {
    setItem(e.target.value);
};
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
};
  const handleClick = () => {
    setClicked(true);
  };
//   const submitForm = () => {
//     setSubmitted(true);
//   };
//post one request
const postData = async () => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({item, notes}),
  });
};
useEffect(() => {
    if(item) {
      postData();
    }
  }, []);

  if (clicked) {
    return (
      <div className="addNewDiv">
        <form onSubmit={postData}>
          <input
            id="addNewItem"
            type="text"
            name="item"
            value={item}
            placeholder="What Item do you want?"
            onChange={handleItemChange}
          />
          <input
            id="addNewNotes"
            type="text"
            name="notes"
            placeholder="notes..."
            value={notes}
            onChange={handleNotesChange}
          />
          <button type="submit">Add To List</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="addNewDiv" onClick={handleClick}>
        <h1>+ Add item</h1>
      </div>
    );
  }
};
export default AddNew;
