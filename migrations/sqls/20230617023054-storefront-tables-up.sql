CREATE TABLE products (
    product_name VARCHAR(255), 
    product_category VARCHAR(100),
    product_price DECIMAL,
    id SERIAL PRIMARY KEY
    );

CREATE TABLE users (
    user_firstname VARCHAR(255), 
    user_lastname VARCHAR(255),
    user_password VARCHAR(255),
    id SERIAL PRIMARY KEY
    );

CREATE TABLE orders (
    user_id INTEGER,
    order_status VARCHAR(50),
    id SERIAL PRIMARY KEY
    );

CREATE TABLE order_products (
    product_quantity INTEGER,
    order_id INTEGER,
    product_id INTEGER,
    id SERIAL PRIMARY KEY
    );
