const express = require('express');//this is the new way of writing it 
const jwt = require('jsonwebtoken'); //this is the library that we will use to generate and verify JWT tokens
const JWT_secret = "mysecretkey"; //this is the secret key that we will use to sign our JWT tokens

const app = express();

app.use(express.json());

const users = []; //it acts as the database for our application

//function generateTtoken(){
  //  return (Math.floor(Math.random() * 100000));
//}
//we have to convert the username to jwt token and then we will send it to the user and then we will verify the token when the user tries to access the protected route
app.post('/signup', function(req,res){
    const token = jwt.sign({
        username : username
    }, JWT_secret);//create the token 


});

app.post('/login', function(req,res){

});

app.post('/me', function(req,res){
    //now the jwt token u sent based on username the user will send it back
    //so we have to use the jwt secret and the token to verify the user and its username 
    const decodedInfo = jwt.verify(token, JWT_secret);
    const username = decodedInfo.username;

});

app.listen(3000);

