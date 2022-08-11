// m就是module.js模块的module.exports对象
const m = require("./module")
const {add,mul} = require("./module")

console.log(m.add(2,3));
console.log(add(2,3));
console.log(mul(2,3));