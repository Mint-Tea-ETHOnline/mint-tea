//import {lit}  from "./lit.js";
var {Lit} = require("./lit.js");

const strenc = Lit.encryptString("str");

console.log("encryptedSymmetricKey = ",strenc.encryptedSymmetricKey);