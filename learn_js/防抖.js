function mydebounce(fn, delay) {

    let timer = null;

    return function (...args) {

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {

            fn.apply(null, args);

            timer = null;
        }, delay);

    };
}
/* 防抖 */
const inputHander = (e) => {
    console.log(e.target.value);
  };
  function debounce(fn, delay = 1000) {
    let timer = null;
    return function dfn(...args) {
      /* 新的fn调用时 若发现上次还有没来得及回调的fn 直接取消 */
      timer && clearTimeout(timer);
  
      // 1秒后回调本次fn
      timer = setTimeout(() => {
        fn.apply(null, args);
        timer = null;
      }, delay);
    };
  }
  ip.addEventListener("input", debounce(inputHander, 1000));