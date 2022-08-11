/* 回调函数 */
function count(n, callback) {
  let temp = 0;
  let timer = setInterval(() => {
    console.log(++temp);
    if (temp === n) {
      clearInterval(timer);
      callback();
    }
  }, 500);
}
function fn1() {
  count(5, () => console.log("任务完成"));
}
// fn1();

/* ajax：自己看手封POST一个表单 */

function fn2() {
  /* 回调地狱 */
  // count(5, () => {
  //   console.log("5任务完成");
  //   count(4,()=>{
  //       console.log("4任务完成");
  //       count(3,()=>console.log("3任务完成"))
  //   })
  // });
}
// fn2();

/* promise */
function countPromise(n) {
  return new Promise((resolve, reject) => {
    let temp = 0;
    let timer = setInterval(() => {
      console.log(++temp);
      if (temp === n) {
        clearInterval(timer);
        resolve(n);
      }
    }, 500);
  });
}
function fn3() {
  countPromise(5)
    .then((data) => {
      console.log(data, "任务完成");
      return countPromise(4);
    })
    .then((data) => {
      console.log(data, "任务完成");
      return countPromise(3);
    })
    .then((data) => console.log("任务完成"));
}
// fn3();

/* async-await */
async function fn4() {
  let data = await countPromise(5);
  console.log(data, "任务完成");

  data = await countPromise(4);
  console.log(data, "任务完成");

  data = await countPromise(3);
  console.log(data, "任务完成");
}
fn4();
