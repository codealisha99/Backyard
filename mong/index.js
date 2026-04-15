const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_secret = "sfasgvfsdgdvs";
const { UserModel, TodoModel } = require("./db");


await mongoose.connect("mongosh mongodb+srv://cluster0.gyqojnb.mongodb.net/--apiVersion 1 --username alisha_31");
app.use(express.json());


app.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.pasword;
    const email = req.body.email;


     await UserModel.insert({
        username: username,
        password: password,
        email: gmail
      })

      res.json({
        message: "user logged in successfully"
      })
});
app.post('/signin', async(req, res) => {
      const email = req.body.email;
        const password = req.body.password;

         const user = await UserModel.findOne({
            Email: Email,
            password: password
        });


        if(user) {
            const token = jwt.sign({
                id: user._id
                
            } , JWT_secret);
            res.json({
                message: "user logged in successfully",
                token: token
            })
        } else  (
            res.status(402).json({ message: "invalif credentials"})
           
        )
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

app.listen(3000);
gwXLqx5G62Ja5v8u