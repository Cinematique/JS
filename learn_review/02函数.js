const obj = { name: "黑哥" };

/* 函数传递 与 返回值传递 */
function fn1() {
  function add(a, b) {
    return a + b;
  }
  function sayHello() {
    console.log("hello");

    // 没有返回值相当于返回undefined
    // return undefined
  }

  let a = add; //函数本身传递给a
  let b = add(2, 3); //函数调用的返回值/结果传递给b

  // console.log(add);//add给log函数的形参赋值
  // console.log(add(2,3));//add(2,3)的结果给Log的形参赋值

  // console.log(sayHello);//f
  console.log(sayHello()); //执行sayHello并打印其返回值undefined
}
// fn1()

/* 常规函数 VS 箭头函数 */
function fn2() {
  /* 常规函数 */
  function fn() {
    console.log("fn:this=", this);
  }
  // fn()//window.fn()
  const obj = {};
  obj.handle = fn; //函数类型数据的传递（引用传递）

  // 调用obj.handle就是在调用fn
  // 调用的主语显式就是obj fn打印出来的this也就是obj
  obj.handle();
  // div.onclick = fn

  /* 箭头函数: this(当做变量看待)从作用域中就近找 */
  // console.log(this);
  const arrowFn = () => console.log("this in arrowFn", this);
  arrowFn();

  // 箭头函数中的this是永恒固定的（静态的）
  obj.arrowHandle = arrowFn;
  obj.arrowHandle();
}
// fn2();

/* this绑定：仅限于常规函数 */
function fn3() {
  function fn(a, b) {
    console.log("this in fn", this);
    console.log("a/b in fn", a, b);
  }
  // fn()

  /* 调用fn并绑定this + （可选项：绑定形参） */
  // fn.call(this的绑定值,a的绑定值,b的绑定值)
  // fn.call(obj)
  // fn.call(obj,12,34)

  /*fn.apply(this的绑定值,[a的绑定值,b的绑定值])*/
  // fn.apply(obj);
  // fn.apply(obj, [12, 34]);

  /* this绑定为null的时候不改变this指向 */
  // fn.call(null, 12, 34);
  // fn.apply(null, [12, 34]);

  /* fn.bind(this的绑定值,a的绑定值,b的绑定值) 返回一个绑定好this的新函数 */
  //   const newFn = fn.bind(obj)
  //   const newFn = fn.bind(obj,12,34)
  const newFn = fn.bind(null, 12, 34);
  newFn(); //调用绑定了this的fn函数

  /* 箭头函数不存在修改this指向的问题 其this是静态的 取决于其声明时的作用域 */
}
// fn3();

/* 自己实现一个bind */
function fn4() {
  function bind(fn, thisArg, ...args) {
    /* 方案一：直接以thisArg为主语去调用fn */
    // thisArg.fn = fn
    // return function(){
    //   thisArg.fn(...args)
    // }
    /* 方案二：可以使用fn.call和fn.apply */
    // return function newFn(){
    //     fn.apply(thisArg,args)
    // }
  }

  function fn(a, b) {
    console.log("this in fn", this);
    console.log("a/b in fn", a, b);
  }

  const newFn = bind(fn, obj, 12, 34);
  newFn();
}
// fn4();

/* 函数作为入参或返回值 */
function fn5() {
  /* 以函数为入参：数组批处理 */
  /* forEach,filter,map,every,some,find,reduce首参皆为处理器函数 */
  // const arr = [1,2,3,4,5]
  // console.log(
  //     arr.reduce(
  //         // handler
  //         (pv,cv)=>pv+cv
  //     )
  // );

  /* 以函数为入参：数组排序 */
  // const arr = [13,23,3,53,35]
  // // 数组的默认排序：将元素转为字面量 然后比码点
  // // console.log(arr.sort());
  // console.log(
  //     arr.sort(
  //         // 比较器函数
  //         (a,b)=>{
  //             return a - b
  //         }
  //     )
  // );

  /* 以函数为入参： */
  // let str = "fuck,你妹，今天天气好,shit"
  // str = str.replace(
  //     /(fuck)|(你妹)|(shit)/g,
  //     (sub)=>{
  //         return sub.replace(/./g,"*")
  //     }
  // )
  // console.log(str);

  /* 以函数做返回值 */
  function fn(a, b) {
    console.log("this in fn", this);
    console.log("a/b in fn", a, b);
  }
  const newFn = fn.bind(obj,12,34)
  newFn()
}
fn5();
