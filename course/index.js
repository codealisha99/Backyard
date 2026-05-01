const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');



const app = express();

app.use(express.json());

app.post('/user/signin', async(req,res) => {
   const username = req.body.username;
   const password = req.body.password;
});
app.post('/user/signup', async(req,res) => {

});

app.get('/user/purchases', (req, res) => {

});

app.post('/course/purchase', (req, res) => {

});

app.get('/user/courses', (req, res) => {

});

app.listen(3000);