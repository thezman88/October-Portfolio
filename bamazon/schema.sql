

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price INT,
  stock_quantity INT
);


Select * FROM products;
/** populates sql products table with items **/


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "KitchenAid Stand Mixer", "Home & Kitchen",260, 20),
	   (2, "iPhone X Case", "Phones", 10, 50),
	   (3, "Echo Dot", "Electronics", 30, 100),
	   (4, "Hasbro Connect 4 Game", "Toys & Games", 15, 25),
	   (5, "Permanet Record By:Edward Snowden", "Books", 20, 200),
	   (6, "Roku Streaming Stick", "Electronics", 50, 10),
	   (7, "Q-tips Cotton Swabs 50 count pack", "Beauty & Personal Care", 5, 85),
	   (8, "Vitamix Venturist V1200", "Home & Kitchen", 69.99, 10),
	   (9, "Ring Video Doorbel", "Electronics", 160, 34),
	   (10, "Amazon Fire 7 Tablet", "Kindle", 40, 200)
