// ​
// 目录

// 一、API默写（入参+返回值含义）







// 二、画图




// 三、名词解释（场景+原理+API）
















// 四、编程手撸
























// 一、API默写（入参+返回值含义）
// 1.HTTP协议请求头+响应头
// 请求头



















// 响应头














// 2.DOM增删改查（元素/内容/属性/样式）
// 编辑

// 3.正则相关的五大API












// 4.数组的批处理API：forEach,filter,map,every,some,find,reduce







































// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// ​
// /* 遍历数组 */
// arr.forEach(
//  item => console.log(item)
// )
// ​
// /* map:映射出平方数形成的新数组 */
// const na = arr.map(
//  item => item*item
// )
// console.log(na);
// ​
// /* filter:过滤出3的倍数 */
// const na = arr.filter(
//  item => (item%3===0)
// )
// console.log(na);
// ​
// /* some：arr是否有3的倍数 */
// const bool = arr.some((item) => {
// console.log("item", item);
// return item % 3 === 0;
// });
// console.log(bool);
// ​
// /* every: arr中是否人人都是3的倍数 */
// const bool = arr.every((item) => {
// console.log("item", item);
// return item % 3 === 0;
// });
// console.log(bool);
// ​
// /* find: 返回数组中第一个3的倍数的结果  第一个满足条件的值/undefind */
// let newArr5 =arr.find((item,index)=>{
// return item>3;
// })
// console.log(newArr5)
// ​
// /* */
// let arr = [1,2,3,4]
// let newArr6=arr.reduce((previousValue,currentValue,currentIndex,array)=>{
//  console.log(currentIndex);
//  console.log(array);
//  return previousValue+currentValue;
//  },10)
//  console.log(newArr6);

// 二、画图
// 1.原型链
// 编辑










// 2.HTTP缓存机制
// 编辑

// 3.事件循环原理图










// 三、名词解释（场景+原理+API）
// 1.值传递/引用传递

// let a = 2;
// let b = a;
// b=3;
// console.log(a,b)//2,3
// 修改b不会改变a的值


// let obj = {
// name:"123",
// age:123
// }
// ​
// let a = obj;
// a.name = "456"
// console.log(obj,a)
// //直接将对象的地址给到变量
// //所以修改a时obj也会改变

// 2.事件传播机制











// 3.事件委托




// 4.AJAX、同源策略、跨域、跨域实现























// ​
// http {
//  ...
//  server {
//      ...
//      location /mul {
//          proxy_pass http://localhost:8000/calc/multiply
//      }
//  }
// }


// ​
// 5.闭包








// function fn3(){
// function score(){
// //这个变量是只能又函数内部访问的私有变量
//  const obj ={}; 
// //例如通过api访问
//  return{
//      set(key,value){
//          obj[key]=value;
//      }
//  }
// }


// function fn3(){
// function score(){
// //这个变量指向当前函数，当被调用时候指向调用者
//  this.obj ={}; 
//  return{
//      set(key,value){
//          obj[key]=value;
//      }
//  }
// }





// //apis 指向一个闭包地址
// let apis = account("张三", 0);
// //将指向修改为null
// apis = null;

// 6.调度
// Promise.all()



//    function promiseAll() {
//      Promise.all([
//        Promise.resolve(3),
//        Promise.reject(42),
//        new Promise(
//          (resolve, reject) => setTimeout(() => resolve("foo"), 5000)
//          //    (resolve,reject)=>setTimeout(()=>reject("我妈不让我和坏孩子玩"),5000)
//        ),
//      ])
//        .then((values) => console.log("values=", values))
//        .catch((err) => console.log("err=", err));
//    }
//    promiseAll()

// Promise.allSettled()


// function promiseAllSettled() {
//      Promise.allSettled([
//        Promise.resolve(3),
//        Promise.resolve(42),
//        new Promise(
//          // (resolve, reject) => setTimeout(() => resolve("foo"), 5000)
//          (resolve, reject) =>
//            setTimeout(() => reject("我妈不让我和坏孩子玩"), 5000)
//        ),
//      ])
//        .then((values) => console.log("values=", values))
//    }
//    promiseAllSettled();

// Promise.race()


// function promiseRace() {
//      Promise.race([
//        new Promise((resolve, reject) => {
//          setTimeout(resolve, 3000, "one");
//        }),
// ​
//        new Promise((resolve, reject) => {
//          //   1000毫秒后 回调reject 入参two
//          setTimeout(reject, 10000, "two");
//        }),
// ​
//        new Promise(
//          // (resolve, reject) => setTimeout(() => resolve("foo"), 5000)
//          (resolve, reject) =>
//            setTimeout(() => reject("我妈不让我和坏孩子玩"), 5000)
//        ),
//      ])
//        .then((value) => console.log("value=", value))
//        .catch((err) => console.log("err=", err));
//    }
//    promiseRace();

// 7.回调函数
// 8.asycn await




// ​
// async function fn() {
//  console.log('Hello world!');
// }
// ​
// console.log(fn().constructor); // Promise()
// // 这里证明其返回值为一个 Promise 对象；


// ​


// async function fn() {
//  console.log(1);
//  var result = await new Promise(function(resolve, reject) {
//      setTimeout(function(){
//          resolve(2);
//      }, 2000);
//  });
//     console.log(result);
//  console.log(3);
//  console.log(await 4); // 4 会被直接返回
// }
// fn();
// // 1
// // 2 (2 秒后输出)
// // 3
// // 4

// 9.函数式编程
// 优点：



// 用处：








// 弊端：



// 10.Map和Set

// 四、编程手撸
// 1.选择排序/冒泡排序
// 1.选择排序
//   function selectionSort(arr) {
//         let minIndex, temp;
//         for (let i = 0; i < arr.length - 1; i++) {
//             minIndex = i;
//             for (let j = i + 1; j < arr.length; j++) {
//                 if (arr[j] < arr[minIndex]) {
//                      minIndex = j; 
//                 }
//             }
//             temp = arr[i];
//             arr[i] = arr[minIndex];
//             arr[minIndex] = temp;
//         }
//         return arr;
//     }
//     console.log(selectionSort(arr));


// 2.冒泡排序
//    function bubbleSort(arr){
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = 0; j < arr.length - 1 - i; j++) {
//             let temp;
//             if (arr[j] > arr[j + 1]) {
//                 temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
//     return arr;
//     }
//     console.log(bubbleSort(arr));


// 2.深拷贝
// 1.JSON
//  /* 
//       深拷贝之JSON：先将对象转为JSON再转换回对象 新对象与老对象保持一致 但地址全新 
//       用JSON方式拷贝出来的副本，会丢失值为function以及undefined的信息
//       */
//       function demoDeepCopy1() {
//         function deepCopyByJson(obj) {
//           var jsonStr = JSON.stringify(obj);//将obj对象转化为JSON字符串
//           var newObj = JSON.parse(jsonStr);// 将JSON字符串转换为javascript对象
//           return newObj;
//         }


// 2.深拷贝
// function deepCopyByRecursion(data){
//       if(typeof data !=="object"&& typeof data !=="function"){
//             return data
//       }else if(typeof data ==="function"){
//             return data
//       }else if(Array.isArray(data)){
//          let arrCopy=[];
//          data.forEach(function(item,index){
//             arrCopy[index] = deepCopyByRecursion(item) 
//          })
//          return arrCopy;
//       }else{
//           let objCopy={};
//           for(let key in data){
//             objCopy[key] = deepCopyByRecursion(data[key]);
//           }
//           return objCopy;  
// }
// }


// 3.全班人马排除空座位后抽取N名幸运观众
// function fn16() {
//         const ids = [];
//         const cols = [null, 8, 9, 9, 9, 9, 6, 8, 8, 8, 8, 7, 8];
// ​
//         for (var i = 1; i <= 3; i++) {
//           for (var j = 1; j <= cols[i]; j++) {
//             ids.push(i * 10 + j);
//           }
//         }
//         console.log(ids);
// ​
//         const cps = []
//         while(ids.length >= 2){
// ​
//           let [a] = ids.splice(parseInt(Math.random()*ids.length),1)
//           let [b] = ids.splice(parseInt(Math.random()*ids.length),1)
// ​
//           console.log("a/b",a,b);
//           cps.push([a,b])
//         }
// ​
//         if(ids.length){
//           cps.push( [ids[0],"臭皮"] )
//         }
// ​
//         console.log(cps);
//       }
//       fn16();


// 4.提取URL中的查询参数
// function getSearchParams(url) {
//   // 创建结果对象
//   const obj = {};
// ​
//   // 摘出a=2&b=3
//   // "/add?a=123&b=456&c=789#abc".match(/\w+=\w+/g)
//   // const reg = /\?(.*)/;
//   // const str = reg.exec(url)[1];
//   // 使用&做分隔符 肢解字符串为[a=2,b=3]
//   // const arr = str.split("&");
// ​
//   const reg = /\w+=\w+/g
//   const arr = url.match(reg)//[子串1，子串2] [a=2,b=3]
//   console.log("getSearchParams:arr=",arr);
// ​
//   // 遍历上述数组 将每个元素以=肢解为 [a,2] 将这一组key-value收集到结果对象中
//   arr.forEach((item) => {
//     let{key,value} = item.split("=");
//     obj[key] = value//obj.a = 2 obj.b=3
//   });
// ​
//   // 返回结果对象
//   return obj;//{a:2,b:3}


// 5.封装ajax Promise 版本
// function dataTosearchParams(data){
// let str = "";
// for(let key in data){
//     str +=`&${key}=${data[key]}`
// }
// return str.slice(1);
// }
// ​
// function ajax(config){
// const xhr =new XMLHttpRequest();
// let {method,url,onSuccess,onFail,data,datatype}=config
// let reqBody = null;
// if(!url){
//     throw Error("错误");
// }
// method = method || "GET";
// !onSuccess &&  (onSuccess = (data)=>{console.log(data)})
// !onFail &&(onFail=(err)=>{console.log(err);})
// ["post","put","patch"].includes(method)&&!datatype && datatype ==="JSON";
// if(method==="get"&&data){
//     url+=`?${dataTosearchParams(data)}`
// }else if(method==="post"&&datatype==="form"){
//    reqBody = dataTosearchParams(data);
// }else if([["post","put","patch"].includes(method)&&datatype==="JSON"]){
//     reqBody = JSON.stringify(data);
// }
// xhr.open(method,url)
// switch(true){
//     case datatype==="form":
//     xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
//     break;
//     case datatype="JSON":
//         xhr.setRequestHeader("content-type","application/json");
//         break;
//         default:
//         break;
// }
// xhr.onload = function(){
//     onSuccess(xhr.responseText);
// };
// xhr.onerror = function(err){
//     onFail(err);
// }
// xhr.send(reqBody);
// }
// function  ajaxPromise(config){
//      return new Promise((resolve,reject)=>{
//         ajax({
//             ...config,
//             onSuccess:(data)=>resolve(data),
//             onFail:(err)=>reject(err)
//         })
//      })
//     
// }


// 6.带有超时功能的Promise




// ​
// /* Promise版 */
// function fn2() {
//   function executeWithTimeout(ajaxPromise, ms) {
//     /* 
//     返回一个Promise对象： 
//     ms到期时强制reject
//     网络数据回来则resolve
//     */
//     return new Promise((resolve, reject) => {
//       /* ms到期时强制reject */
//       let timer = setTimeout(() => {
//         reject("timeout");
//       }, ms);
// ​
//       /* 
//       网络数据回来则resolve 
//       网络数据什么时候回来？要看ajaxPromise什么时候履约
//       */
//       ajaxPromise()
//         // 网络Promise5秒后履约
//         .then((data) => {
//           // 先清除延时定时器
//           clearTimeout(timer);
// ​
//           // 对外resolve数据
//           resolve(data);
//         });
//     });
//   }
// ​
//   /* 网络promise */
//   function ajaxPromise() {
//     return new Promise((resolve) =>
//       setTimeout(() => {
//         resolve(`来自淘宝的数据`);
//       }, 1000)
//     );
//   }
// ​
//   executeWithTimeout(ajaxPromise, 3000)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }
// ​
// /* async版 */
// function fn2X() {
//   async function executeWithTimeout(fn, ms) {
//     return new Promise(async (resolve, reject) => {
//       // ms毫秒以后暴力超时
//       let timer = setTimeout(() => {
//         // reject超时
//         reject("timeout");
//       }, ms);
// ​
//       /* 死等履约 成功后清除定时器+resolve数据 */
//       const data = await fn();
//       clearTimeout(timer);
//       resolve(data);
//     });
//   }
// ​
//   const timeout = 5000;
//   function rq(url) {
//     return new Promise((resolve) => {
//       /* 超时后reject */
//       setTimeout(() => {
//         resolve(`来自${url}的数据`);
//       }, timeout);
//     });
//   }
// ​
//   async function fn1() {
//     return rq("https://www.taobao.com");
//   }
// ​
//   executeWithTimeout(fn1, 3000)
//     .then((value) => console.log("value=", value))
//     .catch((err) => console.log("err=", err));
// }


// ​
// 7.一次性获取多个指定页面

// ​
// function fn3() {
//   /* url进去 获取对应页面的Promise对象出来 */
//   async function getContentByUrl(url) {
//     // 返回一个1秒后履约页面内容的Promise对象
//     return new Promise((resolve, reject) =>
//       setTimeout(() => {
//         Math.random() > 0.5 ? resolve(`${url}的页面内容`) : reject("timeout");
//       }, 1000)
//     );
//   }
// ​
//   const urls = [
//     "https://www.taobao.com",
//     "https://www.baidu.com",
//     "https://web.taobao.com",
//   ];
// ​
//   /* 分步骤版 */
//   async function fetchDataSplited(urls = []) {
//     // 过滤掉非淘宝的url
//     urls = urls.filter((url) => url.endsWith("taobao.com"));
// ​
//     // 将url数组映射成Promise数组（以便调度）
//     const ajaxPromises = urls.map((url) => getContentByUrl(url));
// ​
//     // 用【完全期约：要求每个Promise都落地】调度这个Promise数组
//     const allSettledPromise = Promise.allSettled(ajaxPromises);
// ​
//     // 返回这个完全期约
//     return allSettledPromise;
//   }
// ​
//   async function fetchData(urls = []) {
//     // 返回这个完全期约
//     return Promise.allSettled(
//       urls
//         .filter((url) => url.endsWith("taobao.com"))
//         .map((url) => getContentByUrl(url))
//     );
//   }
// ​
//   // 返回一个【完全期约】
//   fetchData(urls)
//     // 【完全期约】中的每一个Promise都落地时回调 results是一个结果数组
//     .then((results) => console.log(results));
// }
// fn3();


// ​
// 8.IP地址比大小




// 编辑

// function fn1() {
//   /* ip1大返1 小返-1 平返0 */
//   function compare(ip1 = "", ip2 = "") {
//     // 将ip炸碎为number数组 ["1","2","3","4"] 映射为 [1,2,3,4]
//     const arr1 = ip1.split(".").map((item) => item * 1);
//     const arr2 = ip2.split(".").map((item) => item * 1);
// ​
//     // 按照数组顺序从前往后比较
//     for (let i = 0; i < arr1.length; i++) {
//       // 在任何序号下 发现大小关系 就直接返回1/-1 中断比较
//       if (arr1[i] > arr2[i]) {
//         return 1;
//       }
//       if (arr1[i] < arr2[i]) {
//         return -1;
//       }
//     }
// ​
//     // 四段都走完 没有发现大小关系 直接返回0
//     return 0;
//   }
// ​
//   console.log(compare("1.2.3.4", "1.1.3.4")); //1
//   console.log(compare("1.11.3.4", "1.2.3.4")); //1
//   console.log(compare("1.2.3.4", "1.11.3.4")); //-1
//   console.log(compare("1.2.3.4", "1.2.3.4")); //0
// }


// 9.使用闭包管理学生成绩
// //const stus = ["张三","李四","王五"...后面还有好几吨学生]
// //设置任意学生的成绩
// //查询任意学生的全部成绩
// function fn3(){
//   function score(){
//     const obj ={};
//     return{
//         set(key,value){
//             obj[key]=value;
//         },
//         getAll(){
//             return obj
//         }
//     }
//   }
//   const studs = ["张三疯","尼古拉斯赵四","隔壁老王"];
//   const studsObj={};
//   studs.forEach(
//     name=>studsObj[name]=score(name)
//     )
//    let name = "隔壁老王",key="chinese",value=50
//    studsObj[name].set("math",60)
//    console.log(studsObj[name].getAll());
// ​
//   }
//   fn3()


// 10.封装MyMap

// ​
// class myMap{
// constructor(){
//  this.obj ={};
//  this.size=0;
// }
// upDataSize(){
// this.size=Object.keys(this.obj).length
// }
// ​
// set(key,value){
//  this.obj[key]=value;
//  this.upDataSize();
// }
// ​
// get(key){
//  return this.obj[key]
// }
// ​
// delete(key){
// delete this.obj[key];
// upDataSize();
// }
// ​
// clear(){
// this.obj={};
// this.size=0;
// }
// ​
// has(key){
// return this.obj.hasOwnproperty(key);
// }
// ​
// forEach(handler){
// /* 有几个key-value就把handler执行几次 */
// for(let key in this.obj){
//  // 确保handler中的this依然为当前Map对象
//  handler.apply(this,[this.obj[key],key,this])
// }
// }
// key(){
// return Object.keys(this.obj)
// }
// values(){
// return Object.keys(this.obj).map((key)=>{
//  return this.obj[key]
// })
// }
// entries(){
//    /* 将Key数组映射为{key,value}数组并返回 */
//    return Object.keys(this.obj).map((key)=>{
//      return ({key,value:this.obj[key]})
//    })
// }
// }
// ​
// ~(function () {
// // 使用构造函数创建MyMap对象
// const map = new MyMap();
// ​
// /* 增加数据 */
// map.set("six", "陆小凤");
// map.set("seven", "洪七公");
// map.set("eight", "袁八爷");
// ​
// /* 修改与增加一样 */
// map.set("seven", "白景琦");
// ​
// /* 查询数据 */
// console.log(map.get("six"));
// console.log(map.get("seven"));
// console.log(map.get("eight"));
// ​
// /* 删除数据 */
// // map.delete("eight");
// // map.clear();
// ​
// /* 更多查询 */
// console.log(map.size);
// ​
// /* 查询有无键值 */
// console.log(map.has("seven"));
// console.log(map.has("nine"));
// console.log("----------");
// ​
// /* 遍历 */
// map.forEach((value, key, m) => console.log(key, value, m));
// ​
// /* 查询所有的键或值 */
// // console.log(map.keys()); //MapIterator{"six","seven","eight"}
// // console.log(map.values());
// console.log("11",map.entries());//返回数组
// console.log("22",map.obj);
// console.log("==========");
// ​
// /* 遍历迭代器（iterators） */
// for (let entry of map.entries()) {
//  console.log(entry);
// }
// ​
// })();


// ​
// 11.封装MySet
// class mySet{
//  constructor(arr=[]){
//      //indexOf 返回第一次出现的下标
//      //如果遍历数字，数字的下标和第一次出现的下标一直表明第一次出现这个数字
//   this.arr =arr.filter((item,index)=>{
//      return arr.indexOf(item)===index
//   })
//   this.size = this.arr.length
//  }
//  upDataSize(){
//      this.size = this.arr.length
//  }
//  has(value){
//      return this.arr.indexOf(value)!==-1;
//  }
//  add(value){
//  if(!this.has(value)){
//  this.arr.push(value)
//  this.upDataSize();
//  }
// }
//  delete(value){
//      for(let i=0;i<this.arr.length;i++){
//          if(this.arr[i]=value){
//              this.arr.splice(i,1)
//              this.upDataSize()
//              break;
//          }
//      }
//  }
// ​
// clear(){
//  this.arr=[];
//  this.upDataSize();
// }
// values(){
//  return this.arr
// }
// ​
// forEach(handler){
//  for(let i=0;i<this.arr.length;i++){
// handler.apply(this,[this.arr[i],this])
// }
//  }
// }
// ~function testySet(){
//  const set = new mySet()
//  // const set = new MySet([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8])
//  // console.log(set.size);
// ​
//  /* 数据已经实现了去重 */
// ​
//  /* 增删改查 */
//  set.add(2)
//  set.add(5)
//  set.add(7)
//  set.add(10)
//  set.add(10)
// ​
//  // 删除元素
//  // set.delete(5)
//  // set.clear()
// ​
//  console.log(set.has(2));
//  console.log(set.has(15));
// ​
//  console.log(set.values());
//  for (const iterator of set.values()) {
//      console.log(iterator);
//  }
//  console.log("=====");
// ​
//  set.forEach(
//      // (value, value2,s) => console.log(value, value2)
//      function(value,value2,s){
//        // console.log("this in handler",this,);//window
//        console.log("this.size",this.size);
//        console.log(value, value2)
//      }
//  )
// ​
//  console.log(set);
// }()

// 12.实现一个只能调用一次的函数（闭包）
// ~function(){
//  const once =(fn)=>{
//     let used = false;
//     return function(...args){
//      if(!used){
//         let ret = fn(...args)
//         used = true;
//         return ret
//      }else{
//         console.log("用过了");
//      }
//     }
//  }
// ​
//  const add = (a, b) => a + b;
//  const oncedAdd = once(add);
//  console.log(oncedAdd(2, 3)); //5
//  console.log(oncedAdd(2, 4)); //5
// }()


// 13.柯里化(闭包)
// /* 柯里化（颗粒化） */
// function fn5() {
// const curry = (fn) => {
//  // add进去 颗粒化了的add出来
//  return function (a) {
//    // 第一次的入参2存在闭包里
//    return function (b) {
//      // 龙珠已凑齐 调用原始的add 二三得五 返回之
//      return fn(a, b);
//    };
//  };
// };
// ​
// const add = (a, b) => a + b;
// ​
// // add进去 颗粒化了的add出来
// const curriedAdd = curry(add);
// console.log(curriedAdd(2)(3));
// }
// fn5()

// 14.多惨柯里化（闭包）
// ​
// ​
// function fn6() {
//  const curry = (fn) => {
//    return function cfn(...args) {
//      // 参数长度够了的时候 直接调用fn求得结果并返回
//      // 函数长度即参数列表的长度
//      if (args.length === fn.length) {
//        return fn(...args);
//      }
//      console.log("0",...args);
//      console.log("0.5",args);
//      /* 喂进来的参数数量不够时 返回一个函数以便继续接收下一批次的参数 */
//      // cadd(1,2)(3)
//      return function (...b) {
//          console.log("11",...b);
//          console.log("22",args);
//        // 调用f(3)的时候...
//        // 先将参数3拼合到闭包中的args里去 形成[1,2,3]
//        args = args.concat(b); //[1,2,3]
//        console.log("33",args);
// ​
//        // 再形成cadd(1,2,3)的效果
//        return cfn(...args); //管你是最终结果还是继续接收入参的新函数 还给你
//      };
//    };
//  };
//  const add = (a, b, c, d) => a + b + c + d;
//  const cadd = curry(add);
// ​
//  // 一次性给够参数 = add(1,2,3,4)
//  console.log(cadd(1, 2, 3, 4)); //10
//  console.log(cadd(1)(2)(3)(4)); //10
//  console.log(cadd(1, 2)(3)(4)); //10
// }
// fn6();
// ​
// ​


// ​
// 15.任意多个函数串联成【管道/组合】
// function fn9() {
// /* 管道 */
// // const pipe = (a,b,c)=>v=>c(b(a(v)))
// const pipe =
//  (...fns) =>
//  (v) =>
//    fns.reduce((pv, fn) => fn(pv), v);
// const compose =
//  (...fns) =>
//  (v) =>
//    fns.reverse().reduce((pv, fn) => fn(pv), v);
// ​
// //求数值的长度
// const len = (n) => {
//  console.log("len", n);
//  return (n + "").length;
// };
// ​
// //求n的平方
// const pow = (n) => {
//  console.log("pow", n);
//  return n * n;
// };
// ​
// // 求立方根
// const cubicRoot = (n) => {
//  console.log("cubicRoot", n);
//  return Math.cbrt(n)
// };
// ​
// // 从左往右处理
// // console.log(pipe(len, pow, cubicRoot)(10));
// ​
// // 从右往左处理
// console.log(compose(len, pow, cubicRoot)(1000));
// console.log(pipe(len, pow, cubicRoot)(1000));
// }
// fn9();

// 16.封装Pomise
// class MyPromise {

//  /* Promise状态定义 */
//  static STATUS_PENDING = 0; // 挂起态
//  static STATUS_FULFILLED = 1; // 履约态
//  static STATUS_REJECTED = 2; // 毁约态
// ​
//  constructor(executor) {
//      /* 回调队列 + 回调入参 （JS单线程模型=每次只能有一个回调被执行） */
//      this.callbacks = [];
//      this.cbArg = null;
// ​
//      /* 绑定执行器函数中的resolve与reject */
//      this.executor = executor.bind(
//          this,//当前promise实例
// ​
//          //当前promise实例执行resolve时,this不变
//          MyPromise.doResolve.bind(this),
// ​
//          //当前promise实例执行reject时,this不变
//          MyPromise.doReject.bind(this)
//      );
// ​
//      /* 稍后执行任务函数 执行权先让给后续的then,catch,finally */
//      setTimeout(() => {
//          // 执行任务前先将Promise状态设置为pending
//          this.status = MyPromise.STATUS_PENDING;
// ​
//          // 执行任务（任务中会resolve/doResolve或reject/doReject）
//          this.executor();
//      });
//      
//  }
// ​
//  /* promise实例执行resolve */
//  static doResolve(data) {
//      /* 设置状态为履约态 + 设置回调时的入参 + 拉起下一次回调 */
//      this.status = MyPromise.STATUS_FULFILLED;
//      this.cbArg = data;
// ​
//      // 拉起下一次then回调
//      this.next();
//  }
// ​
//  /* promise实例执行reject */
//  static doReject(err) {
//      /* 设置状态为毁约态 + 设置回调时的错误 + 拉起下一次回调 */
//      this.status = MyPromise.STATUS_REJECTED;
//      this.cbArg = err;
// ​
//      // 拉起下一次catch回调
//      this.next();
//  }
// ​
//  /* 
//  成功时：从回调队列头部把所有的catch驱逐
//  失败时：从回调队列头部把所有的then驱逐
//  */
//  shiftCallbacksWithType(type) {
//      while (this.callbacks.length && this.callbacks[0].type === type) {
//          // 驱逐一个回调函数
//          this.callbacks.shift();
//      }
//  }
// ​
//  /* 
//  从回调队列里拉取下一个适当的callback并回调之
//  这是MyPromise的核心代码：递归inside! 
//  */
//  next() {
//      /* 确定该回调哪一个callback */
//      if (this.status === MyPromise.STATUS_FULFILLED) {
//          // 履约时：弹光队列头部的catch回调
//          this.shiftCallbacksWithType("catch");
//      }
// ​
//      if (this.status === MyPromise.STATUS_REJECTED) {
//          // 毁约时：弹光队列头部的then回调
//          this.shiftCallbacksWithType("then");
//      }
// ​
//      /* 如果回调队列已空，则直接结束程序 */
//      if (!this.callbacks.length) {
//          console.log("回调队列已空");
//          return;
//      }
// ​
//      /* 拉取回调队列头部的回调函数（注意这里无视了type只解构出函数本身） */
//      let { callback } = this.callbacks.shift();
// ​
//      /* 防止回调函数中throw错误 */
//      try {
//          // 执行回调并拿到其结果（value或promise对象）
//          let value = callback(this.cbArg);
// ​
//          // 如果回调函数返回一个value 继续向下resolve(value)
//          if (!(value instanceof MyPromise)) {
//              MyPromise.doResolve.call(this, value);
//          } else {
//              // 如果回调函数返回一个Promise对象
//              // 为后续所有callback悄悄置换this为新的Promise对象
//              // 这里特别注意：
//              // Promise对象的执行器很快就要执行起来了！因为构造器里有setTimeout(executor,0)！
//              value.callbacks = this.callbacks
//              // result.callbacks = this.callbacks.map(({ type, callback }) => ({
//              //     type,
//              //     callback: callback.bind(result),
//              // }));
//          }
//      } catch (err) {
//          // 回调函数抛出错误时相当于reject(err)
//          MyPromise.doReject.call(this, err);
//      }
// ​
//  }
// ​
//  /* 语法糖：创建一个立即resolve的Promise对象 */
//  static resolve(data) {
//      return new MyPromise((resolve) => resolve(data));
//  }
// ​
//  /* 语法糖：创建一个立即reject的Promise对象 */
//  static reject(err) {
//      return new MyPromise((resolve, reject) => reject(err));
//  }
// ​
//  /* 收集成功回调到队列 */
//  then(onData) {
//      // 将来一旦Promise毁约 回调队列头部的所有then回调都要弹出作废
//      this.callbacks.push({ type: "then", callback: onData });
//      return this;
//  }
// ​
//  /* 收集失败回调到队列 */
//  catch(onErr) {
//      // 将来一旦Promise履约 回调队列头部的所有catch回调都要弹出作废
//      this.callbacks.push({ type: "catch", callback: onErr });
//      return this;
//  }
// ​
//  /* 收集终点回调到队列（此处假设只有一个终点回调） */
//  finally(onFinish) {
//      this.callbacks.push({ type: "finally", callback: onFinish });
//      return this;
//  }
// }
// ​
// module.exports = MyPromise;

// 17.封装cookie
// ​
// /**
//  * 设置一个cookie
//  * @param {string} key cookie的key
//  * @param {string} value cookie的值
//  * @param {number} maxAge cookie的有效时长（毫秒） 3600000
//  * @param {string}  path cookie的有效路径
// */
// function setCookie(key, value, maxAge, path = "/") {
// document.cookie =
//  `${key}=${value};path=${path};` +
//  (maxAge
//    ? `expires=${new Date(Date.now() - 8 * 3600 * 1000 + maxAge).toString()}`
//    : "");
// }
// ​
// function deleteCookie(key, path = "/") {
// document.cookie = `${key}=我不入地狱谁爱入谁入;path=${path};expires=${new Date(
//  1970,
//  0,
//  1
// )}`;
// }
// ​
// /**
//  * 获取所有cookie
//  * @returns 所有cookie形成的对象
// */
// function getAllCookie() {
// //'a=123; b=456; ts_uid=8310895583'
// const obj = {};
// const str = document.cookie;
// const arr = str.split("; "); //[a=123,b=456]
// arr.forEach((s) => {
//  let [key, value] = s.split("="); //[a,123]
//  obj[key] = value; //{a:123}
// });
// return obj;
// }
// ​
// /**
//  * 获取指定key的cookie值
//  * @param {string} key cookie的key
//  * @returns 要查询的cookie值
// */
// function getCookie(key) {
// return getAllCookie()[key];
// }


// ​
// 18. 同步函数的Promise化
// function fn10() {
//   /* 将同步函数Promise化 */
//   // add函数进来
//   function promisify(fn) {
//     // padd函数出去
//     // ...args = [12,34]
//     return function (...args) {
//  
//       /* 确保返回一个Promise以便链式作业 */
//       return new Promise((resolve, reject) => {
//         try {
//           // 调用原函数+传入入参
//           // 成功时resovle结果
//           const result = fn.apply(null, args);
//           resolve(result);
//         } catch (err) {
//           // 失败时reject错误
//           reject(err);
//         }
//       });
//       
//     };
//   }
//  
//   const add = (a, b) => {
//     if (Math.random() > 0.9) {
//       throw new Error("程序运行出错了");
//     }
//     return a + b;
//   };
//   const multiply = (a, b) => {
//     if (Math.random() > 0.9) {
//       throw new Error("程序运行出错了");
//     }
//     return a * b;
//   };
//  
//   const padd = promisify(add);
//   const pmul = promisify(multiply);
//  
//   /* 清晰地流水化执行业务逻辑 */
//   padd(12, 34)
//     .then((data) => console.log("data=", data))
//     .then((data) => pmul(12, 34))
//     .then((data) => console.log("data=", data))
//     .catch((err) => console.error("err=", err))
//     .finally(() => console.log("game over"));
//  
//   console.log("同步代码执行完毕");
// }
// fn10();
// 19.观察者模式
// function observerDemo(){
//     /* 被观察者 */
//     class Observable {
//         /* 创建对象时要初始化观察者队列 */
//         constructor(name){
//             this.name = name
//             this.observers = []
//         }
//         /* 注册观察者 */
//         register(...observers){
//             this.observers.push(...observers)
//  
//             // 让每个注册进来的观察者o持有当前被观察者的实例
//             observers.forEach(o=>o.observable=this)
//         }
//         /* 注销观察者 */
//         unregister(ob){
//             this.observers = this.observers.filter(o=>o!==ob)
//         }
//         /* 发布事件：令所有观察者响应事件 */
//         emit(event){
//             this.observers.forEach(
//                 o => o.onEvent(event)
//             )
//         }
//  
//     }
//  
//     class Observer {
//         constructor(name){
//             this.name = name
//         }
//         /* 响应事件 */
//         onEvent(event){
//             console.log(`${this.name}响应事件${JSON.stringify(event)}`);
//         }
//     }
//  
//     /* 彩票继承被观察者 */
//     class Lottery extends Observable {
//         constructor(name){
//             super(name)
//             this.timer = null
//         }
//         start(){
//             if(!this.timer){
//                 this.timer = setInterval(() => {
//                     // 对上一期开奖
//                     const event = {
//                         type:"check",
//                         code:parseInt(Math.random()*3)
//                     }
//                     console.log(this.name,"发布事件",event);
//                     this.emit(event)
//     
//                     // 对本期开售
//                     this.emit({
//                         type:"buy",
//                     })
//                 }, 3000);
//             }
//         }
//  
//         stop(){
//             if(this.timer){
//                 clearInterval(this.timer)
//                 this.timer = null
//                 console.log(this.name,"停止运行");
//             }
//         }
//     }
//  
//     /* 玩家继承观察者 */
//     class Player extends Observer{
//         /* 每个玩家实例拥有一个中奖号码 */
//         constructor(name){
//             super(name)
//             this.code = null
//         }
//         /* 兑奖 */
//         check(event){
//             const result =  this.code === event.code
//             console.log(this.name,"中奖否",result);
//  
//             // 如果中奖让彩票机停止运行
//             result && this.observable.stop()
//             return result
//         }
//         /* 下注 */
//         buy(){
//             this.code = parseInt(Math.random()*3)
//             console.log(this.name,"购买了",this.code);
//         }
//         /* 覆写override父类方法 */
//         onEvent(event){
//             super.onEvent(event)
//             switch (event.type) {
//                 case "check":
//                     this.check(event)
//                     break;
//                 case "buy":
//                     this.buy()
//                     break;
//             
//                 default:
//                     break;
//             }
//         }
//     }
//  
//     /* 业务逻辑 */
//     const lot = new Lottery("双色球")
//     const tiger = new Player("今晚打老虎")
//     const gaojin = new Player("赌神高进")
//  
//     /* 注册与注销观察者 */
//     lot.register(tiger,gaojin)
//     lot.unregister(gaojin)
//  
//     /* 让彩票实例周期性地发布开售与开奖事件 */
//     lot.start()
// }
// observerDemo()


// ​