import ListItems from "./ListItems";

const List = ({ items, setItems }) => {
  return items.map((item) => (
    <ListItems
      item={item}
      key={item.itemid}
      items={items}
      setItems={setItems}
      />
  ));
};
export default List;
