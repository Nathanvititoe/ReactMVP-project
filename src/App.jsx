import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import AddNew from './components/AddNew'
import Item from "./components/Item";

import './styles.css'

//get All fetch for list items
const App = () => {
  const URL = 'http://localhost:3001/items'
  const [items, setItems] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL);
      const data = await res.json()
      setItems(data);
    }
    getData();
  }, []);
  const [showItem, setShowItem] = useState(false);
  if(showItem) {
    return (
      
      <Item setShowItem={setShowItem} items={items}/>
    )
  }
  return (
    <div className='container' >
   <Header />
   <AddNew items={items}/>
   
   <List className="list" items={items} setShowItem={setShowItem}/>
   <Footer />
    </div>
  )
}

export default App
