function fn9() {
    /* 管道 */
    const pipe =
      (...fns) =>
      (v) =>
        fns.reduce((pv, fn) => fn(pv), v);
    const compose =
      (...fns) =>
      (v) =>
        fns.reverse().reduce((pv, fn) => fn(pv), v);
    //求数值的长度
    const len = (n) => {
      console.log("len", n);
      return (n + "").length;
    };
    //求n的平方
    const pow = (n) => {
      console.log("pow", n);
      return n * n;
    };
    // 求立方根
    const cubicRoot = (n) => {
      console.log("cubicRoot", n);
      return Math.cbrt(n)
    };
    console.log(compose(len, pow, cubicRoot)(1000));
  }
  fn9();
  