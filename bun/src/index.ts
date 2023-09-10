import { graphqlServer } from '@hono/graphql-server'
import { Hono } from 'hono'
import { schema, rootResolver } from './graphql/graphql'
import { Database } from "bun:sqlite";

export const app = new Hono()

const db = new Database("mydb.sqlite", { create: true });

const deleteTableQuery = db.query(`
    DROP TABLE user;`
);
deleteTableQuery.run();

const createTableQuery = db.query(`
    CREATE TABLE IF NOT EXISTS user (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL UNIQUE
    );`
);
createTableQuery.run();

const addUserQuery = db.query(`
    INSERT INTO user (ID, NAME)
    VALUES($id, $name);`
);

addUserQuery.run({
    $id: "1",
    $name: "novin"
});

const getAllUserQuery = db.query(`
    SELECT * FROM user;`
);

console.log(getAllUserQuery.all());

// GET API for "/"
app.get('/', (c) => c.text('Hello Bun!'))

app.use(
    '/graphql',
    graphqlServer({
        schema,
        rootResolver,
    })
)

// Attach fetch listener to Hono App
app.fire()

Bun.serve({
    port: 3000,
    fetch: app.fetch
});