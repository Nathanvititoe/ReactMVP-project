import express from "express";
const app = express();
import cors from 'cors';
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
app.get('/items', async (req,res) => {
    try {
        const results = await client.query('SELECT * FROM shoppinglist');
        if(!results.rows) {
            res.send('bad url ref').status(400);
            return;
        }
        res.send(results.rows).status(200);
    } catch(err) {
        console.error(err);
        res.send(err).status(500);
    }
});

//create listener
app.listen(PORT, () => {
    console.log("I hear you baby");
  });