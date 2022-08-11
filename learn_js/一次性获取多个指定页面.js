function fn1() {
    async function urlPromise(url) {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          resolve(`${url} page`);
        }, 2000)
      );
    }
  
    async function fetchData(urls = []) {
      const proArr = urls
        .filter((url) => url.endsWith("taobao.com"))
  
        // url数组变形为【获取url页面内容的Promise】数组
        .map((url) => urlPromise(url));
  
      // 将一堆Promise调度起来
      return Promise.allSettled(proArr);
    }
  
    fetchData([
      "https://www.taobao.com",
      "https://www.baidu.com",
      "https://web.taobao.com",
    ]).then(
      (values) => console.log(values) //[https://www.taobao.com的内容,https://web.taobao.com的内容]
    );
  }
  // fn1()