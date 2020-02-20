const Cpass = require('cpass').Cpass;
const cpass = new Cpass();
 
const username = 'username';
const password = 'password';

console.log("Username:", cpass.encode(username));
console.log("Password:", cpass.encode(password));