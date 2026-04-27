const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_secret = "mysecretkey";
const app = express();
//express and jsonwebtoken are library

app.use(express.json());

