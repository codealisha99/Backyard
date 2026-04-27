const jwt = require('jsonwebtoken');
const jwtpassword = "secret";
const zod = require('zod');
//generate, decode , verify

const passwordSchema = zod.string().min(6);
const emailSchema = zod.string().email();

function signJwt(username, password){
    const userNameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!userNameResponse.success || !passwordResponse.success) {
        return null;
    }
    

       


    const signature = jwt.sign({username}, jwtpassword);
    return signature;

};

//verify the token its a weird function use try and catch 
function verifyJwt(token){
    try{
    jwt.verify(token, jwtpassword);
    if(verified) {
        return true;
    } } catch(e) {
        return false;
    }

};
function decodeJwt(token){
      const decoded = jwt.decode(token);
      if(decoded) {
        return true;
      } else {
        return false;
      }
};



