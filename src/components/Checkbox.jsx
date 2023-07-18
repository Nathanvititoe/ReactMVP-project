import { useState, useEffect } from "react";
const Checkbox = ({ item, setCompleted, completed, URL, setItems }) => {
  const [click, setClick] = useState(false);
  const handleCheckBox = () => {
    const newCompleted = !completed
    setCompleted(newCompleted);
    setClick(true);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await saveItem();
  //   setClick(true);
  // };

  const saveItem = async () => {
    const res = await fetch(`${URL}/${item.itemid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed }),
    });

    if (res.ok) {
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemid === item.itemid
            ? { ...prevItem, completed: completed }
            : prevItem
        )
      );
    }
  };
  console.log(click);
  useEffect(() => {
    if (click) {
      saveItem();
      setClick(false);
    }
  }, [click]);
  console.log(item);
  return (
    <div id="check">
      <input
        className="myCheckbox"
        type="checkbox"
        checked={item.completed}
        onChange={handleCheckBox}
      />
    </div>
  );
};
export default Checkbox;
