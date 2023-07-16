DROP TABLE IF EXISTS shoppinglist;

CREATE TABLE shoppinglist (
    itemId SERIAL PRIMARY KEY,
    item VARCHAR(75),
    notes TEXT
)