import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[] | []>([]);

  // Function to search and delete the item
  const toogleCompleted = (searchedItem: Item) => {
    setItems(items.map((item: Item) => {
      if (item.id == searchedItem.id) {
        item.completed = !item.completed;
      }
      return item;
    }))
  }

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input name="text" type="text" autoFocus />
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li className={item.completed ? styles.completed : ""} key={item.id}>
            {item.text} <button onClick={() => toogleCompleted(item) }>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
