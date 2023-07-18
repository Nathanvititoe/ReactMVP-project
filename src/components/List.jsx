import ListItems from "./ListItems";

const List = ({ items, setItems, setCompleted, completed }) => {
  return items.map((item, index) => (
    <ListItems
      item={item}
      key={index}
      items={items}
      setItems={setItems}
      setCompleted={setCompleted}
      completed={completed}
      />
  ));
};
export default List;
