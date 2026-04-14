import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());


const pgClient = new Client("");//source link of the db; it connects to the database with the given credientials 

pgClient.connect();


app.post("/signup", async (req, res) => {
    const username = req.body.username || req.body.user_name;
    const email = req.body.email;
})


if(!username || !email){
    return resizeBy.status(400).json({
        message : "Missing required fields: username and email are required."
    });
}


try{
      const insertQuery = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id';
      const response = await pgClient.query(insertQuery, [username, email]);
}catch(err : any){}

