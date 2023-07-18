import ListItems from "./ListItems";

const List = ({ items, setItems, URL }) => {
  return items.map((item, index) => (
    <ListItems
      item={item}
      key={index}
      items={items}
      setItems={setItems}
      URL={URL}
    />
  ));
};
export default List;
