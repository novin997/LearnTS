import { buildSchema } from "graphql"

export const schema = buildSchema(`
    type User {
        id: ID!
        name: String
    }

    type Room {
        id: ID!
        user: [User]
    }

    type Query {
        room: Room
        user: User
    }
`)

export const rootResolver = (ctx) => {
    return {
        user: () => {
            return { id: "1234", name: "123" }
        },
        room: () => {
            return { 
                id: "1234",
                user: [
                {
                    id: 1,
                    name: "Room-1"
                },
                {
                    id: 2,
                    name: "Room-2"
                }
            ] }
        }
    }
}

