import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

const { Pool } = pg;
// const db_conn = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
const client = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "goshop",
});

const PORT = 3001;
// const PORT = process.env.PORT;
app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "*" }));

//create GET ALL route for list items
app.get("/items", async (req, res) => {
  try {
    const results = await client.query(
      "SELECT * FROM shoppinglist ORDER BY itemid ASC"
    );
    if (!results.rows) {
      res.send("bad url ref").status(400);
      return;
    }
    res.send(results.rows).status(200);
  } catch (err) {
    console.error(err);
    res.send(err).status(500);
  }
});

//create GET ONE route for refreshes
app.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await client.query(
      "SELECT * FROM shoppinglist WHERE itemid = $1",
      [id]
    );
    if (!results.rows[0]) {
      res.send("item not found").status(404);
      return;
    }
    res.send(results.rows[0]).status(200);
  } catch (err) {
    console.error(err);
    res.send(err).status(500);
  }
});

//create POST/WRITE ONE route
app.post("/items", async (req, res) => {
  try {
    const { item, notes, completed } = req.body;
    const results = await client.query(
      "INSERT INTO shoppinglist(item, notes,completed)VALUES($1, $2, $3)",
      [item, notes, completed]
    );
    res.send(results.rows).status(201);
  } catch (err) {
    console.error(err);
    res.send(err).status(500);
  }
});

//Create DELETE route
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await client.query(
      "DELETE FROM shoppinglist WHERE itemid = $1",
      [id]
    );
    if (!results.rows) {
      console.log("that item does not exist");
      res.send("that item does not exist").status(404);
      return;
    }
    res.send(results.rows[0]).status(200);
  } catch (err) {
    console.error(err);
    res.send(err).status(500);
  }
});

//create put/update route
app.patch("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { item, notes, completed } = req.body;

    const currentItem = await client.query(
      "SELECT item, notes, completed FROM shoppinglist WHERE itemid = $1",
      [id]
    );

    if (currentItem.rows.length === 0) {
      console.log("Item not found");
      res.status(404).send("Item not found");
      return;
    }

    const updatedItem = {
      item: item || currentItem.rows[0].item, // Retain previous value if not provided
      notes: notes || currentItem.rows[0].notes, // Retain previous value if not provided
      completed:
        completed !== undefined ? completed : currentItem.rows[0].completed, // Retain previous value if not provided
    };

    const results = await client.query(
      "UPDATE shoppinglist SET item = $1, notes = $2, completed = $3 WHERE itemid = $4",
      [updatedItem.item, updatedItem.notes, updatedItem.completed, id]
    );
    res.status(200).send(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//create listener
app.listen(PORT, () => {
  console.log("I hear you baby");
});
