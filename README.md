# Store Front API

## App Configuration

### DotEnv File
Create a .env file with the following variables (replace xxxx with own details):

>POSTGRES_HOST=localhost
>POSTGRES_USER=xxxx<br>
>POSTGRES_PASSWORD=xxxx<br>
>POSTGRES_DB=storeFront<br>
>POSTGRES_DB_PORT=xxxx<br>
>POSTGRES_DB_TEST=storeFront_test<br>
>POSTGRES_DB_TEST_PORT=xxxx<br>
>ENV=test<br>
>BCRYPT_PASSWORD=xxxx<br>
>SALT_ROUNDS=10<br>
>TOKEN_SECRET=xxxx<br>

### Migration database.json File
Create a database.json file for db-migrate with the databae details used within Docker-Compose (replace xxxx with own details):

>{<br>
>  "dev": {<br>
>    "driver": "pg",<br>
>    "host": "localhost",<br>
>    "database": "storeFront",<br>
>    "port": "xxxx",<br>
>    "user": "xxxx",<br>
>    "password": "xxxx"<br>
>  },<br>
>  "test": {<br>
>    "driver": "pg",<br>
>    "host": "localhost",<br>
>    "database": "storeFront_test",<br>
>    "port": "xxxx",<br>
>    "user": "xxxx",<br>
>    "password": "xxxx"<br>
>  }<br>
>}<br>


## Steps To Run App
1. "Compose Up" docker-compose.yml
2. Start PostgreSQL databases in Docker
3. Migrate database with CLI command  "db-migrate up -e test" (or dev)
3. Test app locally with CLI command "yarn test"
4. Run app locally with CLI command "yarn watch"