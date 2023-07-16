import AddNew from "./AddNew";
import ListItems from "./ListItems";

const List = ({ items, setShowItem }) => {
  return items.map((item) => (
    <ListItems
      item={item}
      key={item.itemid}
      setShowItem={setShowItem}
      />
  ));
};
export default List;
