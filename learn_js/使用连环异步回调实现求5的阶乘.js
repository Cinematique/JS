function fn1() {
    /* 乘法函数 将结果由回调函数给出 */
    const multiply = (a, b, callback) => {
      setTimeout(() => callback(a * b), 2000);
    };
    // multiply(2,3,(ret)=>console.log("ret=",ret))
  
    /* 链式回调 */
    const mulPromise = (a, b) => {
      return new Promise(
        /* executor */
        (resolve, reject) => {
          // multiply(2,3,(ret)=>console.log("ret=",ret))//回调函数中得到结果打印之
          multiply(a, b, (ret) => resolve(ret)); //回调函数中得到结果履约之
        }
      );
    };
  
    mulPromise(2, 3) //开局一只【求二三之积的Promise】 将来履约6
      .then((ret) => 6 * 4) //前述履约履约6  继续向后履约24（臣妾很能 立即履约24）
      .then((ret) => mulPromise(ret, 5)) //前述履约履约24 继续返回一只【求24*5的Promise】 （臣妾没法立刻返回120） 将来履约120
      .then((ret) => console.log("ret=", ret)); //前述履约履约120 直接打印
  
    ~(async function awaitDemo() {
      try {
        // 死等await右侧的Promise履约
        let ret = await mulPromise(2, 3);
  
        // 死等await右侧的Promise履约
        ret = await mulPromise(ret, 4);
  
        // 死等await右侧的Promise履约
        ret = await mulPromise(ret, 5);
        console.log(ret);
      } catch (err) {
        // 如果try以内有Promise毁约 捕获其毁约的原因
        console.log("err=", err);
      }
    })();
  }
  // fn1();