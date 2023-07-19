## API Endpoints
#### Products

    Products Index
    [GET] http://localhost:3000/products
    
    Products Show
    [GET] http://localhost:3000/products/1

    Products Create (REQUIRES JWT TOKEN)
    [POST] http://localhost:3000/products
    Example Body:
    {
        "product_name": "Chicken",
        "product_category": "Food",
        "product_price": 7,
    }

    Top 5 Popular Products
    [GET] http://localhost:3000/top5popularproducts

    Products By Category
    [GET] http://localhost:3000/productsbycategory
    Example Body:
    {
        "category": "Food"
    }


#### Users

    Users Index (REQUIRES JWT TOKEN)
    [GET] http://localhost:3000/users

    Users Show (REQUIRES JWT TOKEN)
    [GET] http://localhost:3000/users/1

    Users Create
    [POST] http://localhost:3000/users
    Example Body:
    {
        "user_firstname": "Ryan",
        "user_lastname": "Lock",
        "user_password": "Access"
    }


#### Orders

    Orders Create
    [POST] http://localhost:3000/orders
    Example Body:
    {
        "user_id": 1,
        "order_status": "Open"
    }

    Order Products Create
    [POST] http://localhost:3000/orders/4/products
    Example Body:
    {
        "product_id": 1,
        "product_quantity": 4
    }

    Orders By UserId
    [GET] http://localhost:3000/ordersByUserId
    Example Body:
    {
        "user_id": 1
    }


## Data Shapes
#### Product

    Table: products
        productName VARCHAR(255), 
        productCategory VARCHAR(100),
        productPrice DECIMAL,
        id SERIAL PRIMARY KEY [Foriegn Key to order_products table]

    #### User

    Table: users
        user_firstname VARCHAR(255), 
        user_lastname VARCHAR(255),
        user_password VARCHAR(255),
        id SERIAL PRIMARY KEY [Foriegn Key to orders table]


#### Orders

    Table: orders
        user_id INTEGER,
        order_status VARCHAR(50),
        id SERIAL PRIMARY KEY [Foriegn Key to product_orders table]

    Table: order_products
        product_quantity INTEGER,
        order_id INTEGER,
        product_id INTEGER,
        id SERIAL PRIMARY KEY
