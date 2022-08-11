function fn2() {
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
      return function pfn(...args) {
        return new Promise(
          /* executor */
          (resolve, reject) => {
            /* 想要履约6 还得调用multiply */
            // const ret = fn(...args,(...a) => resolve(a))
            const ret = fn.apply(null, [...args, (...a) => resolve(a)]); //[6] 异步回调函数从这里resolve
  
            // 有返回值则履约之
            ret && resolve(ret); //同步函数从这里resolve
          }
        );
      };
    }
  
    /* 同步返回函数的Promise化 */
    //   const padd = promisify(add);
    //   padd(2, 3).then(
    //     (value) => console.log("value=", value) //5
    //   );
  
    /* 异步回调函数的Promise化 */
    const pmul = promisify(multiply);
    pmul(2, 3)
      .then((values) => {
        console.log("value=", values); //[6]
        return pmul(values[0], 4); //没法立刻履约24 就返回一个Promise 等待其继续向后履约24
      })
      .then((values) => {
        console.log("value=", values); //[24]
        return pmul(values[0], 5);
      })
      .then((values) => console.log(values[0])); //[120]
  }
  // fn2();
  