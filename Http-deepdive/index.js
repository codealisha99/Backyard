const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());


const users = [];


function generateToken(user){
    return (Math.random() * 100000);
}

app.post('/signup', async(req,res) => {
      const username = req.body.username;
      const password = req.body.password;


      users.push({
        username : username,
        password : password
      })

      res.json({
        message : "User created successfully"
      })


      console.log(users); 

});

app.post('/login', async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username === username && u.password === password){
            return true;
        }else {
            return false;
        }
})
/** we sent the token to the user after the first signup//loginin and not when it is signin bcoz
 * registering in the system is just creating an account and it does not require any authentication but 
 * when the user first time log ins then we needd to prove he is the same user so then we provide the user the
 * token for authentication
 * 
 * learn how to implement  1)Email/OTP verification 2)Rate limiting (prevent bot spam) 3)CAPTCHA
 */
if(foundUser){
    const token = generateToken();
    foundUser.token = token;

    res.json({
        message : "Login successful",
        token : token
    })
} else {
    res.status(404).send({
        message : "User not found"
    })
}
  

        console.log(users);
});

app.get('/me' , async (req,res) =>{
        const token = req.headers.token;
       

        const foundUser = users.find(function(u){
            if(u.token === token ){
                return true;
            }else {
                return false;
            }
        }); // Added closing parenthesis here

        if(foundUser){
            res.json({
                username : foundUser.username,
                password : foundUser.password
            })
        } else {
            res.status(404).json({
                message : "User not found"
            })
        }
});


app.listen(5789);