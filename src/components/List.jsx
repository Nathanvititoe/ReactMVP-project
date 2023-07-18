import ListItems from "./ListItems";

const List = ({ items, setItems, URL, getData }) => {
  return items.map((item, index) => (
    <ListItems
      item={item}
      key={index}
      items={items}
      setItems={setItems}
      URL={URL}
      getData={getData}
    />
  ));
};
export default List;
