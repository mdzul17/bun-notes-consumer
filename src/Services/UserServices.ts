import { Pool } from "pg"

const db = new Pool();

interface createUserPayload {
    id: string,
    username: string,
    fullname: string,
    email: string,
    password: string
}

export const usersService = {
    createUser: async (payload: createUserPayload) => {
        const { id, username, fullname, password, email } = payload

        const query = {
            text: "INSERT INTO users(id, username, password, fullname, email) VALUES($1, $2, $3, $4, $5)",
            values: [id, username, password, fullname, email]
        }

        return await db.query(query)
    },
};
