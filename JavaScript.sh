JavaScript课堂练习

API默写（入参+返回值含义）
HTTP协议请求头+响应头
DOM增删改查（元素/内容/属性/样式）
正则相关的5大API
数组的批处理API：forEach,filter,map,every,some,find,reduce
/* 使用批处理函数实现如下功能 */
const arr = [1,2,3,4,5,6,7,8,9]

// 遍历数组
// 将所有元素映射为对应的平方数，打印映射出的新数组
// 过滤出3的倍数，打印过滤后的结果数组
// 判断arr中是否所有元素都是3的倍数
// 判断arr中是否有元素都是3的倍数
// 从数组中找出第一个3的倍数
// 求arr中所有元素的和，使用reduce实现
// 在100的基础上，加入arr中所有元素的和，使用reduce实现
复制代码
画图
原型链
HTTP缓存机制
事件循环原理图
TCP三次握手/四次挥手原理图
浏览器渲染原理图
原理解释（场景+原理+API）
值传递/引用传递
事件传播/派发机制
事件委托
谈谈对原型链的理解
地址栏URL回车后发生了什么
同源策略，跨域方案
谈谈对JS异步/事件循环/JS单线程模型的理解
Promise的原理是什么？如果没有Promise会不会自己封装一个
谈谈对闭包的理解
谈谈对函数式编程的理解（闭包、高阶函数、柯里化、组合、管道、函数缓存）
JsonWebToken的理解
编程手撸
选择排序/冒泡排序
深拷贝
手撸函数防抖与节流
使用连环异步回调实现求5的阶乘：
function multiply(a,b,callback){
    setTimeout(
        ()=>callback(a*b),
        2000
    )
}
√ 要求基于multiply函数，经过多次运算求得5的阶乘；
√ 使用Promise链式回调和async-await两种方式实现；
复制代码
提取URL中的查询参数
// 假设url为/add?a=12&b=34#abc，要求得到{a:12,b:34}
function getSearchParams(url){
    //实现之
}
复制代码
封装ajax,实现POST一个表单
ajax({
  url,
  dataType: "form",
  data: { name: "admin", pwd: "123456" },
  onSuccess: (data) => console.log(data),
  onFail: (err) => console.log("err=", err),
});
复制代码
封装上一题的Promise版本，调用如下：
ajaxPromise({
  url: "http://www.httpbin.org/post",
  method: "POST",
  dataType: "form",
  data: { name: "heige", pwd: "123456" },
  // onSuccess: (data) => console.log("data=", data),
  // onFail: (err) => console.log("err=", err),
})
  .then((data) => console.log("data=", data))
  .catch((err) => console.log("err=", err));
复制代码
带有超时功能的Promise
微信图片_20220717233623.png

一次性获取多个指定页面
微信图片_20220717233704.png

IP地址比大小
微信图片_20220717233720.png

实现闭包管理全班学生成绩
function score(name){
    //实现闭包内容
}
const stus = ["张三","李四","王五"...后面还有好几吨学生]
let name = "随便谁",key="随便什么学科",value=随便什么分数
设置任意学生的任意成绩
查询任意学生的全部成绩
复制代码
手封MyMap实现以下效果
const map = new MyMap()
map.set("name","张三") 
map.set("age",20) 
map.set("gender","男") 

map.forEach(
    (value,key)=>console.log(key,value)
)//"name","张三" "age",20 "gender","男"

for(let entry of map.entries()){
    console.log(entry)
}//{key:"name",value:"张三"} {key:"age",value:20} {key:"gender",value:"男"}

console.log(map.size)//3
console.log(map.get("name"))//张三
console.log(map.get("age"))//20

console.log(map.has("name"))//true
console.log(map.has("myname"))//false

map.delete("age")
map.clear()
console.log(map.size)//0
复制代码
全班人马排除空座位后抽取N名幸运观众
const stus = [1,2,3...100] //共100名学生
const empties = [12,34,56,78]//空座位
let n = [1,96]以内的随机整数
console.log(pick(3))//[12,55,3]
function pick(n){
    //实现业务逻辑
}
复制代码
手撸观察者模式：实现彩票机周期性地发布【开售】【开奖】事件，玩家开售时下注，开奖时购买，一旦中奖则彩票机停止工作；
实现任意多个入参的函数fn的柯里化
  const curry = (fn) => {
      //实现之
  };

  // add函数进去 颗粒化了的cadd函数出来
  const add = (a, b, c, d) => a + b + c + d;
  const cadd = curry(add);

  // 一次性给够参数 = add(1,2,3,4)
  console.log(cadd(1, 2, 3, 4)); //10
  console.log(cadd(1)(2)(3)(4)); //10
  console.log(cadd(1, 2)(3)(4)); //10
复制代码
实现任意多个函数的管道与组合
  /* 管道 */
  // const pipe = (a,b,c)=>v=>c(b(a(v)))
  const pipe = 实现之;
  const compose = 实现之;

  //求数值的长度
  const len = (n) => (n + "").length;

  //求n的平方
  const pow = (n) => n * n;

  // 求立方根
  const cubicRoot = (n) => Math.cbrt(n);

  // 从左往右处理
  // console.log(pipe(len, pow, cubicRoot)(10));//10的长度为2 平方后得4 开三方得1.x

  // 从右往左处理
  console.log(compose(len, pow, cubicRoot)(1000));//1000立方根10 平方后100 长度3
复制代码
函数的Promise化
// 同步函数
function add(a, b) {
  return a + b;
}

// 带有异步回调的函数
function multiply(a, b, callback) {
  setTimeout(() => callback(a * b), 1000);
}
// multiply(2, 3, (ret) => console.log("ret=", ret));

/* 异步函数的Promise化 */
function promisify(fn) {
    //fn进去 Promise化的fn出来 实现之
}

/* 同步返回函数的Promise化 */
const padd = promisify(add)
padd(2,3).then(
    value => console.log("value=",value)//5
)

/* 异步回调函数的Promise化 */
const pmul = promisify(multiply);
pmul(2, 3)
  .then((values) => {
    console.log("value=", values);//6
    return pmul(values[0], 4);
  })
  .then((values) => {
    console.log("value=", values);//24
    return pmul(values[0], 5);
  })
  .then((values) => console.log(values[0]));//120
复制代码
封装MongoDB数据引擎层
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("runoob");
  var myobj = { name: "菜鸟教程", url: "www.runoob" };
  dbo.collection("site").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("文档插入成功");
    db.close();
  });
});
复制代码
/* 通用的获取collection连接 */
function getCollection(dbName, collectionName) {
    //实现之
}

/* 通用插入数据 */
function doCreate(dbName, collectionName, dataObj) {
    //实现之
}

// 模型层调用
function addUser(user) {
  // 对控制层返回的是一个Promise对象
  return doCreate(dbName, collectionName, user);
}
复制代码
手撸数据驱动视图微框架
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>微框架3</title>
  </head>

  <body>
    <!-- 4个Dom元素挂载着2个【响应式数据】 -->
    <p id="pMyname">{name}</p>
    <p id="pMyage">{age}</p>
    <p id="pGender">{gender}</p>

    <script>
      /*数据驱动视图微框架*/
      function defineReactive(data, keys = []) {
          // 实现之
      }
    </script>

    <!-- 业务逻辑代码 -->
    <script>
      const data = {};

      /* 提前定义响应式数据 */
      defineReactive(data, [
        { name: "age", listeners: [hMyage, pMyage] },
        { name: "name", listeners: [hMyname, pMyname] },
        { name: "gender", listeners: [pGender] },
      ]);

      /* 初始化响应式数据 */
      data.name = "黑哥";
      data.age = 18;
      data.gender = "男";

      /* 响应式数据动态变化 */
      setInterval(() => {
        data.name = Date.now();
        data.age = data.age + 1;
        data.gender = data.gender === "男" ? "女" : "男";
      }, 1000);

    </script>
  </body>
</html>