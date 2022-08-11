/* 抽人头 */
function fn3() {
    let stus = [];
    for (let i = 1; i < 100; i++) {
      stus.push(i);
    }
  
    /* 排除 */
    const empties = [12, 34, 56, 78]; //空座位
    stus = stus.filter((s) => empties.indexOf(s) === -1);
    // console.log(stus);
  
    /* 抽人头 */
    const pick = (arr, n) => {
      // 幸运观众
      let luckies = [];
  
      // 算法一：只要幸运观众的人头数还不满N 就一直循环
      // while (luckies.length < n) {
      //   // 随机抽取幸运观众的序号
      //   let randomIndex = parseInt(Math.random() * arr.length);
      //   let stu = stus[randomIndex];
  
      //   // 如果幸运观众中不含stu 就将stu丢入
      //   !luckies.includes(stu) && luckies.push(stu);
      // }
  
      /* 算法二：只允许循环N次 每次弹出一个元素 */
      for(let i=0;i<n;i++){
          let randomIndex = parseInt(Math.random() * arr.length);
          // [24].concat([1,2,3])
          luckies = arr.splice(randomIndex,1).concat(luckies)
      }
  
      // 丢还幸运观众数组
      return luckies;
    };
    console.log(pick(stus, 5));
  }
  // fn3();