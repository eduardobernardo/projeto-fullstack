CREATE TABLE IF NOT EXISTS tb_customers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  address TEXT,
  phone TEXT,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tb_products(
  id SERIAL PRIMARY KEY,
  name TEXT,
  price NUMERIC,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tb_orders (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT fk_customer 
    FOREIGN KEY(customer_id) 
      REFERENCES tb_customers(id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tb_order_items(
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,

  CONSTRAINT fk_order_id 
    FOREIGN KEY(order_id) 
      REFERENCES tb_orders(id)
      ON DELETE SET NULL,

  CONSTRAINT fk_product_id 
    FOREIGN KEY(product_id) 
      REFERENCES tb_products(id)
      ON DELETE SET NULL
);
