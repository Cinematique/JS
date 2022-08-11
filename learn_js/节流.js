function mythrottle(fn, delay) {
    // 调用禁令（默认假）
    let timer = null;
  
    return function (...args) {
      /* 没有禁令则直接调用 */
      if (!timer) {
        fn.apply(null, args);
  
        // 设置禁令timer 并于1后撤销
        timer = setTimeout(() => {
          // 到点撤销禁令
          timer = null;
        }, delay);
      } 
      // else{
      //     console.log("禁令存在，本次调用被节流了");
      // }
    };
  }