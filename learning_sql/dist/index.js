import express from "express";
import { Client } from "pg";
const app = express();
app.use(express.json()); // to parse the json data coming from the client
const pgClient = new Client("postgresql://neondb_owner:npg_jog8kXnTEs3i@ep-wandering-violet-ai5uj0hc-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
/**
 * we can also write
 * * const pgClient = new client({
 * user : "neondb_owner",
 * password : "npg_jog8kXnTEs3i",
 * port : 5432,
 * database : "neondb",
 * host : "ep-wandering-violet-ai5uj0hc-pooler.c-4.us-east-1.aws.neon.tech")
 */
pgClient.connect();
//it should be an async function as it is not in this device but somewhere in usa so it might take time
app.post("/signup", async (req, res) => {
    const username = req.body.username || req.body.user_name; // Support both just in case
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;
    if (!username || !email || !password || !city || !country || !street || !pincode) {
        return res.status(400).json({
            message: "Missing required fields: username, email, and password are required."
        });
    }
    try {
        const insertquery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`;
        const insertAddressQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5)`;
        await pgClient.query('BEGIN'); // Start a transaction
        const response = await pgClient.query(insertquery, [username, email, password]);
        const userId = response.rows[0].id; // Get the generated user ID
        const addressResult = await pgClient.query(insertAddressQuery, [city, country, street, pincode, userId]);
        await pgClient.query('COMMIT'); // Commit the transaction
        res.status(201).json({
            message: "User created successfully"
        });
    }
    catch (err) {
        console.error("Error creating user:", err);
        // Handle specific DB errors if needed (e.g., unique constraint violation)
        if (err.code === '23505') {
            return res.status(409).json({
                message: "User with this email or username already exists."
            });
        }
        res.status(500).json({
            message: "Internal server error while creating user"
        });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map