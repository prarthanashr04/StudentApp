const expressJwt = require('express-jwt');
const fs = require('fs');

const RSA_PUBLIC_KEY = fs.readFileSync('./keys/public.pem');

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY, algorithms:["RS256"]
}); 



module.exports = {
    checkIfAuthenticated
}