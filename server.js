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
    const results = await client.query("SELECT * FROM shoppinglist ORDER BY itemid ASC");
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

//create POST/WRITE ONE route
app.post("/items", async (req, res) => {
  try {
    const { item, notes } = req.body;
    const results = await client.query(
      "INSERT INTO shoppinglist(item, notes)VALUES($1, $2)",
      [item, notes]
    );
    res.send(results.rows).status(201);
  } catch (err) {
    console.error(err);
    res.send(err).status(500);
  }
});

//Create DELETE route
app.delete("/items/:item", async (req, res) => {
  try {
    const { item } = req.params;
    const results = await client.query(
      "DELETE FROM shoppinglist WHERE itemid = $1",
      [item]
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
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { item, notes } = req.body;
    const results = await client.query(
      "UPDATE shoppinglist SET item = $1, notes = $2 WHERE itemid = $3",
      [item, notes, id]
    );
    if(!results.rows) {
      console.log("item not found");
      res.send("item not found").status(404);
      return;
    }
    res.send(results.rows[0]).status(200)
  } catch (err) {
    console.error(err);
    res.send(err).status(500)
  }
});

//create listener
app.listen(PORT, () => {
  console.log("I hear you baby");
});
