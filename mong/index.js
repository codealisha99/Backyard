const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_secret = "sfasgvfsdgdvs";
const { UserModel, TodoModel } = require("./db");
const { z } = require("zod");


await mongoose.connect("");
app.use(express.json());


app.post('/signup', async(req, res) => {

    const requiredBody = z.object({
        email: z.string().min(3).max(255).email(),
        password: z.string(),
        name: z.string()
    })

    const validation = requiredBody.safeParse(req.body);

    if(!validation.success) {
        return res.status(400).json({
            message: "validation error",
            errors: validation.error.errors
        })
    }
    const username = req.body.username;
    const password = req.body.pasword;
    const email = req.body.email;

    const hashedpassword = await bcrypt.hash(password, 10);

     await UserModel.insert({
        username: username,
        password: hashedpassword,
        email: email
      })

      res.json({
        message: "user logged in successfully"
      })
});
app.post('/signin', async(req, res) => {
      const email = req.body.email;
        const password = req.body.password;

        const passwordMatch = bcrypt.compare(password, user.password);

         const response = await UserModel.findOne({
            Email: Email,
            
        });
         if(!response) {
            return res.status(404).json({
                message: "user not found"
            })

        
});
app.post('/todo',auth, (req, res) => {
       const userId = req.userId;
});


app.get('/todos',auth, (req, res) => {
      const userId = req.userId;
});

function auth(req,res,next) {
    const token = req.header.token;

    const decodedtoken = jwt.verify(token, JWT_secret);
    if(decodedtoken) {
        req.userId = decodedtoken.id;
        next();
    } else {
        res.status(401).json({
            message: "unauthorized"
        })
    }
}
iycMvRZOkdd55ahh
app.listen(3000);
