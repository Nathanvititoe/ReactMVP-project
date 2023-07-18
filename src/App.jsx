import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";
import AddNew from "./components/AddNew";

import "./styles.css";

//get All fetch for list items
const App = () => {
  // const URL = "http://localhost:3001/items";
  const URL = "/items";
  const [items, setItems] = useState([]);

  //get all request
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL);
      const data = await res.json();
      setItems(data);
    };
    getData();
  }, []);

  return (
    <div className="container">
      <Header />
      <AddNew URL={URL} />

      <List className="list" items={items} setItems={setItems} URL={URL} />
      <Footer />
    </div>
  );
};

export default App;
