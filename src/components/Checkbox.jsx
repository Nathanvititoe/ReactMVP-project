const Checkbox = ({item}) => {
    const handleCheckBox = () => {
        console.log('checked')
        //handle post request for marking complete
    }
  return (
    <div id="check">
     <input className="myCheckbox" type="checkbox" checked={item.completed} onChange={handleCheckBox} />
    </div>
  );
};
export default Checkbox;
