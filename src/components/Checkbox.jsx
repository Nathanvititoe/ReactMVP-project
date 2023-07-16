import {useState} from 'react';
const Checkbox = ({item, setChecked,checked}) => {
  const [check, setCheck] = useState(false)
    const handleCheckBox = () => {
      setChecked(!checked);
        return setCheck(!check)
    }
  return (
    <div id="check">
     <input className="myCheckbox" type="checkbox" checked={check} onChange={handleCheckBox} />
    </div>
  );
};
export default Checkbox;
