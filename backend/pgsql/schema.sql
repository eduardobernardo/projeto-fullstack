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
  price numeric,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tb_orders (
  id SERIAL PRIMARY KEY,
  customer_id integer NOT NULL,
  order_status TEXT,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT fk_customer 
    FOREIGN KEY(customer_id) 
      REFERENCES tb_customers(id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tb_order_items(
  id SERIAL PRIMARY KEY,
  quantity integer DEFAULT 1,
  order_id serial REFERENCES tb_orders (id) ON DELETE SET NULL,
  product_id serial REFERENCES tb_products (id) ON DELETE SET NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
