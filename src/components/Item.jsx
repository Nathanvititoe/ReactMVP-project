import {useState} from 'react';
const Modal = ({ items, setShowModal }) => {
    const [formData, setFormData] = useState({
        item: '',
        notes: '',
      });
  const handleClick = () => {
    //add update functionality here
    setShowModal(false);
  };

  const handleSubmit = () => {
    console.log("submitted form");
  };

  const handleInputChange = () => {
    console.log("change");
  };

  return (
    <div className="modal">
      <form className="formDiv" onSubmit={handleSubmit}>
        <label>
          Item :
          <input
            type="text"
            name="item"
            value={items.item}
            // onChange={handleInputChange}
          />
        </label>

        <label>
          Notes : 
          <input
            type="text"
            name="notes"
            value={items.notes}
            // onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handleClick} type="button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Modal;
