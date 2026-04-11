import express from "express";
import { prismaClient } from "@prisma/client";

const app = express();
const client = new prismaClient();
//1st end point 
app.get("/signup", async (req,res) => {
    const user = await client.user.findMany();
            res.json(user);
    
}) 
//2nd end point
app.get("/getToDos/:id", async (req,res) => 
    {
    const id = req.params.id;

    const user = await client.user.findFirst({
        where: {
            id : parseInt(id)
        },
        select: {
            username : true,
            ToDos : true
        }
    });
    res.json(user); 

}



async function createUser() {
   const user =  await client.user.create({
             data: {
                id : 1,
                username : "john_doe",
                password : "securepassword123",
                age : 30

             }})

             console.log(user);
}

createUser();
