/* 基本数据类型 */
function fn1() {
  let num = 123;
  let str = "hello";
  let bool = true;
  let myGf = null;
  let myMoney = undefined;
}
// fn1();

/* 引用数据类型 */
function fn2() {
  // 数组
  const arr = [1, 2, 3];
  // 对象
  const obj = { name: "黑哥", age: 18 };
  // 函数
  const add = function (arg1, arg2) {
    return arg1 + arg2;
  };
  const grow = (p) => p.age++;
  // 类
  class Person {}
}
// fn2();

/* 值传递 VS 引用传递 */
function fn3() {
  const add = function (arg1, arg2) {
    return arg1 + arg2;
  };
  const grow = (p) => p.age++;

  /* 等号右边给等号左边赋值 => 数据的【传递】行为 */
  let a = 123;
  let b = 456;
  let c = obj;

  /* 实参a,b给形参arg1,arg2赋值 => 数据的【传递】行为 */
  add(a, b);

  /* 只要是引用传递就会一拖二：修改任何一个副本 都会影响本体 */
  let d = obj;
  d.name = "白鸽";
  grow(obj);
  console.log(obj);
}
// fn3();
