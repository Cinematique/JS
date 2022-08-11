function fn6() {
    const curry = (fn) => {
      return function cfn(...args) {
        if (args.length === fn.length) {
          return fn(...args);
        }
        return function (...b) {
          args = args.concat(b);
          return cfn(...args); 
        };
      };
    };
  
    const add = (a, b, c, d) => a + b + c + d;
    const cadd = curry(add);
  
    console.log(cadd(1, 2, 3, 4)); //10
    console.log(cadd(1)(2)(3)(4)); //10
    console.log(cadd(1, 2)(3)(4)); //10
  }
  // fn6()