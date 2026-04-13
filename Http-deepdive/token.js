const jwt = require('jsonwebtoken');
//generate, decode , verify
const value = {
    username: 'alisha',
    password: '123456'
};

const token = jwt.sign(value, 'secret');



