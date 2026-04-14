import pg from 'pg';
const { Client } = pg;

const connectionString = "postgresql://neondb_owner:npg_jog8kXnTEs3i@ep-wandering-violet-ai5uj0hc-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function checkDb() {
    const client = new Client({ connectionString });
    try {
        await client.connect();
        console.log("Connected to database successfully.");

        // Check if users table exists
        const tableCheck = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE  table_schema = 'public'
                AND    table_name   = 'users'
            );
        `);
        console.log("Users table exists:", tableCheck.rows[0].exists);

        if (tableCheck.rows[0].exists) {
            // Check columns
            const columnCheck = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users';
            `);
            console.log("Columns in 'users' table:");
            console.table(columnCheck.rows);
        } else {
            console.log("The 'users' table does NOT exist. You may need to create it.");
        }

    } catch (err) {
        console.error("Database check failed:", err);
    } finally {
        await client.end();
    }
}

checkDb();
