// module.exports = {}

/* 在现有的module.exports对象上做编辑 */
// module.exports.add = (a,b)=>a+b
// module.exports.mul = (a,b)=>a*b

/* 换一个全新的module.exports对象 */
// module.exports = {
//     add:(a,b)=>a+b,
//     mul:(a,b)=>a*b
// }

/* 最佳实践 */
const add = (a, b) => a + b;
const mul = (a, b) => a * b;
module.exports = {
  add,
  mul,
};
