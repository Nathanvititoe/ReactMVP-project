import { useState } from "react";
import Checkbox from "./Checkbox";

const AddNew = ({ items }) => {
  const [clicked, setClicked] = useState(false);
  const handleInputChange = () => {};
  const handleClick = () => {
    setClicked(true);
  };

  if (clicked) {
    return (
      <div className="addNewDiv">
        <input
          id="addNewItem"
          type="text"
          name="item"
          placeholder="What Item do you want?"
          // onChange={handleInputChange}
        />
        <input id="addNewNotes" type="text" name="notes" placeholder="notes..." />
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
