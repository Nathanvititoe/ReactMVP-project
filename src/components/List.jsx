import ListItems from "./ListItems";

const List = ({ items, setItems }) => {
  return items.map((item, index) => (
    <ListItems
      item={item}
      key={index}
      items={items}
      setItems={setItems}
      />
  ));
};
export default List;
