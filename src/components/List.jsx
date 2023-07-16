import ListItems from "./ListItems";

const List = ({ items }) => {
  return items.map((item) => (
    <ListItems
      item={item}
      key={item.itemid}
      />
  ));
};
export default List;
