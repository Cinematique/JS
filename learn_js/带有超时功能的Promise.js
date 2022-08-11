function fn2() {
    async function execWithTimeout(fn, ms) {
      return new Promise((resolve, reject) => {
        // 时间一到就毁约
        let timer = setTimeout(() => {
          reject("timeout");
        }, ms);
  
        // 网络返回数据时履约
        fn().then((page) => {
          clearTimeout(timer);
          resolve(page);
        });
      });
    }
  
    /*  */
    function rq() {
      return new Promise((resolve) => setTimeout(resolve, 1000, `淘宝的数据`));
    }
  
    function fn(url) {
      return rq("https://www.taobao.com");
    }
  
    execWithTimeout(fn, 3000)
      .then((value) => console.log("value=", value))
      .catch((err) => console.log("err=", err));
  }
  fn2();